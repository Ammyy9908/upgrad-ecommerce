import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useAdmin() {
  const [admin, setAdmin] = useState(true);
  const user = useSelector((state) => state.appReducer.user);

  useEffect(() => {
    if (user?.roles[0].name !== "ADMIN") {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  }, [user]);
  return admin;
}

export default useAdmin;
