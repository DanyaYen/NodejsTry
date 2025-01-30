let token = localStorage.getItem("token");
let currentUser = null;
async function loadHotels() {
  try {
    const response = await fetch("/api/hotels");
    const hotels = await response.json();

    const container = document.getElementById("hotelsContainer");
    if (hotels.length === 0) {
      container.innerHTML = "<p>Нет доступных отелей</p>";
      return;
    }

    container.innerHTML = hotels
      .map(
        (hotel) => `
            <div class="hotel-card" data-id="${hotel.id}">
                <h3>${hotel.name}</h3>
                <p>Адрес: ${hotel.address}</p>
                <p>Рейтинг: ${"⭐".repeat(hotel.rating)}</p>
                <button onclick="showHotelRooms(${
                  hotel.id
                })">Посмотреть номера</button>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Ошибка загрузки отелей:", error);
    document.getElementById("hotelsContainer").innerHTML =
      "<p>Ошибка при загрузке отелей</p>";
  }
}
async function login(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token);
      currentUser = data.user;
      updateAuthUI();
      hideLoginForm();
    } else {
      alert("Ошибка входа: " + (data.message || "Неизвестная ошибка"));
    }
  } catch (error) {
    console.error("Ошибка входа:", error);
    alert("Ошибка при попытке входа");
  }
}
async function register(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Регистрация успешна! Теперь вы можете войти.");
      hideRegisterForm();
      showLoginForm();
    } else {
      alert(data.message || "Ошибка при регистрации");
    }
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    alert("Ошибка при регистрации");
  }
}
async function showHotelRooms(hotelId) {
  try {
    console.log("Загрузка номеров для отеля:", hotelId);
    const response = await fetch(`/api/hotels/${hotelId}/rooms`);
    const rooms = await response.json();
    console.log("Полученные номера:", rooms);

    const modal = document.getElementById("roomsModal");
    const container = document.getElementById("roomsContainer");
    const hotelCard = document.querySelector(
      `.hotel-card[data-id="${hotelId}"]`
    );
    const hotelName = hotelCard
      ? hotelCard.querySelector("h3").textContent
      : "Отель";

    document.getElementById("hotelName").textContent = hotelName;

    container.innerHTML = rooms
      .map(
        (room) => `
            <div class="room-card">
                <h3>Номер ${room.room_number}</h3>
                <p>Тип: ${room.type}</p>
                <p>Цена: ${room.price} ₽/ночь</p>
                <p>Вместимость: ${room.capacity} чел.</p>
                ${
                  token
                    ? `<button onclick="bookRoom(${room.id})">Забронировать</button>`
                    : '<p class="login-prompt">Войдите, чтобы забронировать</p>'
                }
            </div>
        `
      )
      .join("");

    modal.style.display = "block";
  } catch (error) {
    console.error("Ошибка загрузки номеров:", error);
    alert("Ошибка при загрузке номеров");
  }
}
async function bookRoom(roomId) {
  if (!token) {
    alert("Необходимо войти для бронирования");
    return;
  }

  const checkIn = prompt("Введите дату заезда (ГГГГ-ММ-ДД):", "2024-12-01");
  const checkOut = prompt("Введите дату выезда (ГГГГ-ММ-ДД):", "2024-12-05");

  if (!checkIn || !checkOut) return;

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId,
        checkIn,
        checkOut,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Бронирование успешно создано!");
      closeRoomsModal();
    } else {
      alert(data.message || "Ошибка при бронировании");
    }
  } catch (error) {
    console.error("Ошибка бронирования:", error);
    alert("Ошибка при бронировании");
  }
}
function showLoginForm() {
  document.getElementById("loginForm").style.display = "block";
}

function hideLoginForm() {
  document.getElementById("loginForm").style.display = "none";
}

function showRegisterForm() {
  document.getElementById("registerForm").style.display = "block";
}

function hideRegisterForm() {
  document.getElementById("registerForm").style.display = "none";
}

function closeRoomsModal() {
  document.getElementById("roomsModal").style.display = "none";
}

function updateAuthUI() {
  const guestNav = document.getElementById("guestNav");
  const userNav = document.getElementById("userNav");
  const userName = document.getElementById("userName");

  if (currentUser) {
    guestNav.style.display = "none";
    userNav.style.display = "block";
    userName.textContent = `Здравствуйте, ${currentUser.name}!`;
  } else {
    guestNav.style.display = "block";
    userNav.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("token");
  token = null;
  currentUser = null;
  updateAuthUI();
}

document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI();
  loadHotels();
});
