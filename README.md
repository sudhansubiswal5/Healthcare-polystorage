# Healthcare Polystorage

Healthcare Polystorage is a full-stack medical management application with:
- **Backend**: Node.js + Express APIs (MongoDB/MySQL related integrations)
- **Frontend**: React + Vite UI

## Project Structure

```text
Healthcare-polystorage/
├── README.md
└── polystorae-medical/
    ├── .gitignore
    ├── backend/
    │   ├── config/
    │   │   ├── db.js
    │   │   └── mongo.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   └── hospitalController.js
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   ├── models/
    │   │   ├── Appointment.js
    │   │   ├── Bed.js
    │   │   └── User.js
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   └── hospitalRoutes.js
    │   ├── server.js
    │   ├── package.json
    │   └── package-lock.json
    └── frontend/
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── postcss.config.js
        ├── tailwind.config.js
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── index.css
            ├── api/
            │   ├── authApi.js
            │   ├── axiosInstance.js
            │   └── hospitalApi.js
            ├── components/
            │   └── BedGrid.jsx
            └── pages/
                ├── Appointments.jsx
                ├── BedGrid.jsx
                ├── Dashboard.jsx
                ├── Login.jsx
                └── Register.jsx
```
