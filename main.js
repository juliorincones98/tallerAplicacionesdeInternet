const bookingForm = document.querySelector(".booking-form");
const formStatus = document.querySelector("[data-form-status]");

if (bookingForm instanceof HTMLFormElement && formStatus instanceof HTMLElement) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const payload = {
      ownerName: formData.get("nombre-dueno")?.toString().trim() ?? "",
      petName: formData.get("nombre-mascota")?.toString().trim() ?? "",
      petType: formData.get("tipo")?.toString().trim() ?? "",
      service: formData.get("servicio")?.toString().trim() ?? "",
      appointmentDate: formData.get("fecha")?.toString().trim() ?? "",
      appointmentTime: formData.get("hora")?.toString().trim() ?? "",
      phone: formData.get("telefono")?.toString().trim() ?? "",
      notes: formData.get("mensaje")?.toString().trim() ?? ""
    };

    const submitButton = bookingForm.querySelector('button[type="submit"]');

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    formStatus.textContent = "Estamos enviando tu solicitud...";
    formStatus.dataset.state = "loading";

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No se pudo registrar la reserva.");
      }

      bookingForm.reset();
      formStatus.textContent = "Reserva enviada con exito. Te contactaremos para confirmar la hora.";
      formStatus.dataset.state = "success";
    } catch (error) {
      formStatus.textContent = error instanceof Error
        ? error.message
        : "Ocurrio un error al enviar la reserva.";
      formStatus.dataset.state = "error";
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Confirmar solicitud";
      }
    }
  });
}
