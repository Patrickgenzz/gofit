export const formatDate = (date) => {
  const tanggalLahir = new Date(date);

  const formattedDate = tanggalLahir.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

export const formatDateToHour = (date) => {
  const startDate = new Date(date);
  const endDate = new Date(date);

  // Menambahkan 2 jam ke tanggal awal
  endDate.setHours(endDate.getHours() + 2);

  const formattedStartTime = startDate.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
  });

  const formattedEndTime = endDate.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${formattedStartTime} - ${formattedEndTime}`;
};

export const formatDateTime = (date) => {
  const tanggal = new Date(date);

  const formattedDate = tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = tanggal.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
  });

  return `${formattedDate} Jam ${formattedTime}`;
};

export const formatMoney = (rp) => {
  return rp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

export const formatDateShow = (date) => {
  const tanggalLahir = new Date(date);
  const formattedDate = tanggalLahir.toISOString().slice(0, 10);
  return formattedDate;
};
