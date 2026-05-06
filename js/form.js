function sendMessage() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    window.alert("Please fill in all fields.");
    return;
  }

  const waMessage = encodeURIComponent(`Hi Taimoor! I'm ${name} (${email}).\n\n${message}`);
  window.open(`https://wa.me/923067204137?text=${waMessage}`, "_blank", "noopener");
}
