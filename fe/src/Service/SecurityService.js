import axios from "axios";
import { env } from "../env";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const CheckLoginComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let token = sessionStorage.getItem("token");
      try {
        if (token) {
          let checkData = await axios
            .get(`${env.REACT_APP_API}/users/validate`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status !== 200) {
                console.log(res);
                toast.error(res.data.message, {
                  autoClose: 2000,
                });
                setTimeout(() => {
                  navigate("/");
                }, 3000);
              }
              // return res;
            })
            .catch((error) => {
              toast.error("Only employee can access", {
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate("/");
              }, 3000);
            });

          // return checkData;
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    })();
  }, []);
};

// export const checkLogin = async () => {
//   let token = sessionStorage.getItem("token");
//   let checkData = await axios
//     .get(`${env.REACT_APP_API}/users/validate/`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       return error;
//     });

//   return checkData;
// };
