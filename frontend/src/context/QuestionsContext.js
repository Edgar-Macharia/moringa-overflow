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
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);

  const [tags, setTags] = useState([]);
  // const { isLoggedIn } = useContext(AuthContext); 
  const fetchNotifications = async () => {
    try {
      // const response = await axios.get("/api/notifications");
      // setNotifications(response.data);
      console.log(setNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchTags();
    fetchNotifications();
    fetchFavoriteQuestions();
  }, []);

// Fetch all questions
const fetchQuestions = () => {
  fetch("/questions")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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

  ///Single Question
  const fetchSingleQuestion = (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to view the question", "error");
      return;
    }

    fetch(`/questions/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch question");
        }
        return res.json();
      })
      .then((data) => {
        setQuestion(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
        Swal.fire("Error", "Failed to fetch question", "error");
      });
  };

  //answers for single question

  const fetchQuestionAnswers = (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Not authorized to view the question", "error");
      return;
    }

    fetch(`/questions/${id}/answers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch answers");
        }
        return res.json();
      })
      .then((data) => {
        setQuestion(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching answers:", error);
        Swal.fire("Error", "Failed to fetch answers", "error");
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
          nav(`/viewquestion/${questionId}`);
        }
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        Swal.fire("Error", "Failed to update question", "error");
      });
  };

// favorite a question
const toggleFavorite = (id) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    Swal.fire("Error", "Not authorized to favorite question", "error");
    return;
  }

  fetch(`/questions/${id}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.errors) {
        Swal.fire("Error", data.errors, "error");
      } else {
        setFavoriteQuestions(data);
      }
    })
    .catch((error) => {
      console.error("Error favoriting question:", error);
      Swal.fire("Error", "Failed to favorite question", "error");
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
  ///fetch tags
  const fetchTags = () => {
    fetch("/tags")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTags(data); // Assuming the response is an array of tag objects
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
        Swal.fire("Error", "Failed to fetch tags", "error");
      });
  };

  const upvoteQuestion = (questionId) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
  
    fetch(`/questions/${questionId}/upvote`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        if (data.message === 'Upvoted successfully.') {
          // Find the question in the state by its ID
          const updatedQuestions = questions.map((q) => {
            if (q.id === questionId) {
              // Update the upvotes_count and downvotes_count
              return {
                ...q,
                upvotes_count: data.upvotes_count,
                downvotes_count: data.downvotes_count,
              };
            }
            return q;
          });
          // Update the state with the updated questions
          setQuestions(updatedQuestions);
        }
      })
      .catch((error) => {
        console.error("Error upvoting question:", error);
      });
  };
  
  const downvoteQuestion = (questionId) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
  
    fetch(`/questions/${questionId}/downvote`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        if (data.message === 'Downvoted successfully.') {
          // Find the question in the state by its ID
          const updatedQuestions = questions.map((q) => {
            if (q.id === questionId) {
              // Update the upvotes_count and downvotes_count
              return {
                ...q,
                upvotes_count: data.upvotes_count,
                downvotes_count: data.downvotes_count,
              };
            }
            return q;
          });
          // Update the state with the updated questions
          setQuestions(updatedQuestions);
        }
      })
      .catch((error) => {
        console.error("Error downvoting question:", error);
      });
  };
  
  const fetchFavoriteQuestions = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    if (!token) {
      return;
    }
  
    fetch(`/users/${userId}/favorite_questions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch favorite questions");
        }
        return res.json();
      })
      .then((data) => {
        setFavoriteQuestions(data); 
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching favorite questions:", error);
      });
  };
  

  const isQuestionFavorited = (questionId) => {
    return favoriteQuestions.some((favorite) => favorite.id === questionId);
  };
  
  const contextData = {
    questions,
    createAnswer,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestions,
    fetchTags,
    toggleFavorite,
    tags,
    notifications,
    upvoteQuestion,
    downvoteQuestion,
    favoriteQuestions,
    fetchFavoriteQuestions,
    isQuestionFavorited,
  };

  return (
    <QuestionsContext.Provider value={contextData}>
      {children}
    </QuestionsContext.Provider>
  );
}
