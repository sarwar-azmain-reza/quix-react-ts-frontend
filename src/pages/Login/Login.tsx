import { useEffect, useState } from "react";
import api from "../../services/apis/api.js"
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth.js";
import { setToken } from "../../services/plugins/axios.js";
import { useLocation, useNavigate } from "react-router-dom";
const Login = () => {
  const [page, setPage] = useState<String>("login");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { setLoggedToken, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const from = (location.state as any)?.from || '/';

  const handleLoginOrRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    console.log(email, password)

    if (email && password) {
      const params = {
        email,
        password
      }

      if (page == 'login') {
        setIsLoading(true)
        api.auth.login(params)
          .then((res: any) => {
            console.log(res)
            if (res.success) {
              setLoggedToken({ quix_token: res.user_token })
              localStorage.setItem("quix-token", res.user_token);
              setToken(res.user_token)
              toast.success("Login Successful!")
              navigate(from)
            } else {
              toast.error("Login Failed!")
            }
          }).catch((err: any) => {
            console.log(err)
            toast.error("Error Logging In!")
          })
          .finally(() => {
            setIsLoading(false)
          })
      }

      else {
        setIsLoading(true)
        api.auth.createAccount(params)
          .then((res: any) => {
            console.log(res)
            if (res.success) {
              toast.success("Account Created Successfully!Pleasee Login")
              setPage('login')
            }
          }).catch((err: any) => {
            console.log(err)
            toast.error("Error Creating Account!")
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }
  }

  const toggleAuth = () => {
    if (page == 'login') {
      setPage('register')
    } else {
      setPage('login')
    }
  }

  useEffect(() => {
    if (user) {
      navigate(from)
    }
  }, [user])

  return (
    <div className={`  h-screen items-center py-16`}>

      <div className="mb-10 flex lg:flex-row flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
            alt="pngwing-com"

            className="h-72 mr-5"
          />
        </div>
        <div className={`card md:w-1/2 lg:w-2/6 shadow-2xl mt-10 bg-base-100 `}>
          <h2 className="text-center mt-5 text-xl font-semibold">
            {
              page == 'login' ?
                <span>Login to QuiX</span>
                :
                <span>Register to QuiX</span>
            }
          </h2>
          <form className="card-body" onSubmit={handleLoginOrRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered focus:outline-none"
                required
              />
            </div>
            {/* {error && <p className="text-red-600">Error: {error}</p>} */}
            <div className="form-control mt-5">

              <button
                className={`btn bg-sky-600 border-none text-white hover:text-black ${isLoading ? 'disabled loading-dots' : ''}`}
              >
                {
                  page == 'login' ?
                    <span>Login</span>
                    :
                    <span>Register</span>
                }
              </button>

            </div>
            <div className="mt-5">

              <p className="text-blue-600 text-center cursor-pointer" onClick={toggleAuth}>
                {
                  page == 'login' ?
                    <span>Don't have an account? Sign Up</span>
                    :
                    <span>Already have an account? Login</span>
                }
              </p>

            </div>
            {/* {userError && <p>User Not Valid : {userError}</p>} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;