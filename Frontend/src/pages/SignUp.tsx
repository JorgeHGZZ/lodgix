import style from '../styles/SignUp.module.css';

function SignUp() {
    return (
        <form className={style.form}>
            <p className={style.title}>Register </p>
            <p className={style.message}>Signup now and get full access to our app. </p>
            <div className={style.flex}>
                <label>
                    <input placeholder="" type="text" className={style.input}/>
                        <span>Firstname</span>
                </label>

                <label>
                    <input required placeholder="" type="text" className={style.input}/>
                        <span>Lastname</span>
                </label>
            </div>

            <label>
                <input required placeholder="" type="email" className={style.input}/>
                    <span>Email</span>
            </label>

            <label>
                <input required placeholder="" type="password" className={style.input}/>
                    <span>Password</span>
            </label>
            <label>
                <input required placeholder="" type="password" className={style.input}/>
                    <span>Confirm password</span>
            </label>
            <button className={style.submit}>Submit</button>
            <p className={style.signin}>Already have an acount ? <a href="#">Signin</a> </p>
        </form>
    )
}

export default SignUp;