import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import userServices from "../../../services/adminServices";
import catServices from "../../../services/categoriesServices";
import { toast } from "react-hot-toast";
import CategoryForm from "./CategoryForm";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchData() {
      const rep = await catServices.getCategory(id);
      //   console.log(rep.data);
      setCategory(rep.data);
    }

    fetchData();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCategory((prevValue) => {
      //   console.log(name + ": " + value);
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function updateCategory(e) {
    navigate("/admin/categories");
    try {
      await userServices.updateCategory(category);
      toast.success("Category Modified Successfully");
    } catch (e) {
      toast.error("Something went wrong!");
      console.log(e);
    }
  }

  return (
    <CategoryForm
      title={"Edit"}
      updateCategory={updateCategory}
      category={category}
      handleChange={handleChange}
    />
  );
}

export default CategoryEdit;
