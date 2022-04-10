import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { postRequest } from '../../utils/api';

const LoginForm = () => {
    const dispatch = useDispatch();
    const mounted = useRef(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (form?.username === "" || form?.password === "") {
            alert("Username dan password tidak boleh kosong!");
            return false;
        }

        setLoading(true);
        postRequest(`/auth/login`, form)
            .then(result => {
                if (result?.status) {
                    dispatch(login({
                        data: result?.data,
                        token: result?.token
                    }))
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                }
            })
            .catch(err => {
                alert(err?.error);
            })
            .finally(() => {
                setTimeout(() => {
                    if (mounted.current) {
                        setLoading(false);
                    }
                }, 1000);
            })
    }

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        }
    }, []);

    return (
        <div className="card p-8">
            <h3 className="font-semibold text-2xl mb-8 block">Login ke Sistem</h3>
            <form action="" autoComplete="off" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username / Email
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="form-input"
                        placeholder="Username / Email"
                        name="username"
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        placeholder="Password akun"
                        name="password"
                        onChange={onInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="button-primary button-block"
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>
                <p className="text-center text-gray-400 my-2">atau</p>
                <button
                    type="button"
                    className="button-primary-outline button-block"
                    onClick={() => router.push('/register')}
                >
                    Daftar
                </button>
            </form>
        </div>
    );
};

export default LoginForm