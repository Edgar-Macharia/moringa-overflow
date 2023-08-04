import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const QuestionsContext = createContext();

export default function QuestionsProvider({ children }) {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [tags, setTags] = useState([]);
  // const { isLoggedIn } = useContext(AuthContext); // Get the isLoggedIn state from AuthContext
  const fetchNotifications = async () => {
    try {
      // const response = await axios.get("/api/notifications");
      // setNotifications(response.data);
      console.log(setNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  
  useEffect(()=>{
    fetchQuestions()
    fetchTags()
    fetchNotifications();
  }, [])

  // Fetch all questions
  const fetchQuestions = () => {
    fetch("/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const sortedQuestions = data.sort((a, b) => b.id - a.id);
        setQuestions(sortedQuestions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        Swal.fire("Error", "Failed to fetch questions", "error");
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question: newQuestionData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          Swal.fire("Error", data.errors[0], "error");
        } else {
          Swal.fire("Success", "Question created successfully", "success");
          nav(`/questions`);
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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


  useEffect(() => {
    fetchQuestions();
  }, []);


  // Search questions
  const searchQuestions = (searchTerm) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(`/questions/search?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuestions(data.questions);
        }
      })
      .catch((error) => {
        console.error("Error searching questions:", error);
        Swal.fire("Error", "Failed to search questions", "error");
      });
  };

  const fetchTags = () => {
    axios
      .get('/tags', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setTags(response.data); // Assuming the response is an array of tag objects
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
        Swal.fire('Error', 'Failed to fetch tags', 'error');
      });
  };


  const createTag = async (tagName) => {
    try {
      const response = await axios.post('/tags', { name: tagName }, { // Adjust the API endpoint as needed
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating tag:', error);
      return null;
    }
  };

  const addTag = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const contextData = {
    questions,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestions,
    fetchTags,
    tags,
    notifications,
    createTag,
    addTag,
  };

  return (
    <QuestionsContext.Provider value={contextData}>
      {children}
    </QuestionsContext.Provider>
  );
}
