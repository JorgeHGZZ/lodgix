import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../../services/api";
import "../../styles/user.css";

interface TokenPayload {
  userId: string;
  name: string;
  imageURL?: string;
}

function UserProfile() {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<TokenPayload>(token) : null;

  const [name, setName] = useState(decoded?.name || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const currentImage = decoded?.imageURL
    ? `http://localhost:5000${decoded.imageURL}`
    : "/images/default-avatar.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!decoded?.userId) {
      alert("No se encontró el usuario.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    if (image) {
      formData.append("image", image);
    }

    api.put(`/users/${decoded.userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("Usuario actualizado correctamente. Vuelve a iniciar sesión para ver los cambios en el sidebar.");
      })
      .catch((error) => {
        console.error("Error al actualizar usuario:", error);
        alert(error.response?.data?.message || "Error al actualizar usuario.");
      });
  };

  return (
    <div className="user-profile-wrapper">
      <div className="user-profile-card">
        <h1>Mi perfil</h1>

        <div className="profile-image-box">
          <img src={currentImage} alt="Usuario" />
        </div>

        <form onSubmit={handleSubmit} className="user-profile-form">
          <div className="form-group">
            <label>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Correo</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Foto de perfil</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>

          <button type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;