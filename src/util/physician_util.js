export const getAllPhysicians = () => {
  return fetch("http://localhost:5000/physician/allPhysicians")
    .then((res) => res.json());
}

export const getAppointmentsByPhysicianId = (id) => {
  return fetch(`http://localhost:5000/appointment/${id}`)
    .then((res) => res.json());
}