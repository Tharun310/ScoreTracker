import axios from "axios";
import { env } from "../env";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
export const CheckAdminComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        let token = sessionStorage.getItem("token");
        if (token) {
          let checkData = await axios
            .get(`${env.REACT_APP_API}/admin/admin_validate`, {
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
              console.log("eeee", error);
              toast.error("Only Admin can access", {
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate("/");
              }, 3000);
            });

          return checkData;
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    })();
  }, []);
};
