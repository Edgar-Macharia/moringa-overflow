import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; // Assuming the file containing the AuthContext is named AuthContext.js

export const QuestionsContext = createContext();

export default function QuestionsProvider({ children }) {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  // const { isLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state from AuthContext

  // Fetch all questions
  const fetchQuestions = () => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };

  // Create a new question
  const createQuestion = (newQuestionData) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to create question", "error");
      return;
    }

    fetch("/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ question: newQuestionData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          Swal.fire("Error", data.errors, "error");
        } else {
          Swal.fire("Success", "Question created successfully", "success");
          nav(`/questions/${data.id}`);
        }
      })
      .catch((error) => {
        console.error("Error creating question:", error);
        Swal.fire("Error", "Failed to create question", "error");
      });
  };

  // Update a question
  const updateQuestion = (questionId, updatedQuestionData) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to update question", "error");
      return;
    }

    fetch(`/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ question: updatedQuestionData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          Swal.fire("Error", data.errors, "error");
        } else {
          Swal.fire("Success", "Question updated successfully", "success");
          nav(`/questions/${questionId}`);
        }
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        Swal.fire("Error", "Failed to update question", "error");
      });
  };

  // Delete a question
  const deleteQuestion = (questionId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to delete question", "error");
      return;
    }

    fetch(`/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          Swal.fire("Success", data.message, "success");
          nav("/questions");
        } else {
          Swal.fire("Error", "Failed to delete question", "error");
        }
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
        Swal.fire("Error", "Failed to delete question", "error");
      });
  };
useEffect(()=>{
  fetchQuestions()

}, [])
  // ... (other context methods you may have)

  const contextData = {
    questions,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };

  return (
    <QuestionsContext.Provider value={contextData}>
      {children}
    </QuestionsContext.Provider>
  );
}
