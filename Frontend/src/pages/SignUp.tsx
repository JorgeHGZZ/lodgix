import style from '../styles/SignUp.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../services/api';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        image: null as File | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, image: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('phone', formData.phone);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await api.post('/users/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            }
        } catch (error: any) {
            console.error('Error:', error);
            const message = error.response?.data?.message || 'Error al conectar con el servidor';
            alert(message);
        }
    };

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <p className={style.title}>Register </p>
            <p className={style.message}>Signup now and get full access to our app. </p>
            <div className={style.flex}>
                <label>
                    <input
                        placeholder=""
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={style.input}
                        required
                    />
                    <span>Name</span>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={style.input}
                    />
                    <span>Phone</span>
                </label>
            </div>

            <label>
                <input required placeholder="" type="email" name="email" value={formData.email} onChange={handleChange} className={style.input} />
                <span>Email</span>
            </label>

            <label>
                <input required placeholder="" type="password" name="password" value={formData.password} onChange={handleChange} className={style.input} />
                <span>Password</span>
            </label>

            <label>
                <input type="file" accept="image/*" onChange={handleImageChange} className={style.input} />
                <span>Profile Image</span>
            </label>

            <button type="submit" className={style.submit}>Submit</button>
            <p className={style.signin}>Already have an acount ? <NavLink to="/login">Sign in</NavLink> </p>
        </form>
    )
}

export default SignUp;