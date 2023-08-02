import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; // Assuming the file containing the AuthContext is named AuthContext.js

export const QuestionsContext = createContext();

export default function QuestionsProvider({ children }) {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [notifications, setNotifications] = useState([]); 
  // const { isLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state from AuthContext
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications");
      setNotifications(response.data);
      console.log(setNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchNotifications(); // Fetch notifications when the component mounts
  }, []);
  // Fetch all questions
  const fetchQuestions = () => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => {
        const sortedQuestions = data.sort((a, b) => b.id - a.id);
        setQuestions(sortedQuestions);
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
          console.log(data.errors)

          Swal.fire("Error", data.errors[0], "error");
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

   // Create a new question
   const createAnswer = (newAnswerData) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to create question", "error");
      return;
    }

    fetch("/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newAnswerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          console.log(data.errors)

          Swal.fire("Error", data.errors[0], "error");
        } else {
          Swal.fire("Success", data.message, "success");
          nav(`/questions`);
          axios.post('/notifications', { message: `Your question has been answered.`, user_id: newAnswerData.user_id });
        }
      })
      .catch((error) => {
        console.error("Error creating answer:", error);
        Swal.fire("Error", "Failed to create answer", "error");
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

  // Search questions
  const searchQuestions = (searchTerm) => {
    console.log(searchTerm)
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(`/questions/search?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data) 
      if(data.success){    
        setQuestions(data.questions);
      }

    })
    .catch((error) => {
      console.error("Error searching questions:", error);
      Swal.fire("Error", "Failed to search questions", "error");
    });
  };

  const contextData = {
    questions,
    createAnswer,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestions,
    notifications,
  };

  return (
    <QuestionsContext.Provider value={contextData}>
      {children}
    </QuestionsContext.Provider>
  );
}
