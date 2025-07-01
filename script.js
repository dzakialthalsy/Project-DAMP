function toggleMenu() {
    var menu = document.querySelector(".menu");
    menu.classList.toggle("active");

}

// Inisialisasi Google Maps
function initMap() {
  const malang = { lat: -7.9666, lng: 112.6326 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: malang,
  });
  new google.maps.Marker({
    position: malang,
    map: map,
    title: "Kota Malang",
  });
}
window.initMap = initMap;

// Pencarian lokasi parkir berdasarkan input
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      document.querySelectorAll("#parkirList .card-title").forEach((title) => {
        const card = title.closest(".col-md-6");
        if (title.textContent.toLowerCase().includes(keyword)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Dropdown filter fakultas
  const fakultasDropdown = document.getElementById("dropdownFakultas");
  const estimasiEl = document.getElementById("estimasiWaktu");

  const estimasiData = {
    FILKOM: {
      keberangkatan: "07:15 WIB",
      kosong: "10:00 WIB"
    },
    FIB: {
      keberangkatan: "07:45 WIB",
      kosong: "11:30 WIB"
    },
    FEB: {
      keberangkatan: "08:00 WIB",
      kosong: "12:00 WIB"
    },
    FT: {
      keberangkatan: "06:45 WIB",
      kosong: "09:45 WIB"
    }
  };

  if (fakultasDropdown) {
    fakultasDropdown.addEventListener("change", function () {
      const selected = this.value;
      document.querySelectorAll("#parkirList .parkir-item").forEach((card) => {
        const isMatch = selected === "" || card.dataset.fakultas === selected;
        card.style.display = isMatch ? "block" : "none";
      });

      if (estimasiEl) {
        if (selected === "") {
          estimasiEl.innerHTML = <p class="text-muted fst-italic">Silakan pilih fakultas untuk melihat estimasi waktu parkir kosong & waktu keberangkatan ideal.</p>;
        } else if (estimasiData[selected]) {
          const data = estimasiData[selected];
          estimasiEl.innerHTML = `
            <ul class="list-unstyled mb-0">
              <li><strong>Waktu Kosong:</strong> ${data.kosong}</li>
              <li><strong>Waktu Keberangkatan Ideal:</strong> ${data.keberangkatan}</li>
            </ul>
          `;
        } else {
          estimasiEl.innerHTML = <p class="text-warning">Belum ada data estimasi untuk fakultas ini.</p>;
        }
      }
    });
  }

  // Inisialisasi Chart jika elemen tersedia
  const chartCanvas = document.getElementById("chartParkir");
  if (chartCanvas) {
    new Chart(chartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Tersedia", "Hampir Penuh", "Penuh"],
        datasets: [
          {
            label: "Jumlah Lokasi",
            data: [3, 2, 2],
            backgroundColor: ["green", "goldenrod", "crimson"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
});