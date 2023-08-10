import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const QuestionsContext = createContext();

export default function QuestionsProvider({ children }) {
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  

  const [tags, setTags] = useState([]);
  // const { isLoggedIn } = useContext(AuthContext); 
  
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
      Swal.fire("Error", "Login to create a question", "error");
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
          setQuestions((prevQuestions) => [data, ...prevQuestions]);
          nav(`/questions`);
          fetchNotifications();
        }
      })
      .catch((error) => {
        console.error("Error creating question:", error);
        Swal.fire("Error", "Failed to create question", "error");
      });
  };

// Create a new answer
const createAnswer = (newAnswerData) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    Swal.fire("Error", "Login to create an answer", "error");
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

// favorite a question
const toggleFavorite = (id) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    Swal.fire("Error", "Login to add question to favorites", "error");
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
      Swal.fire("Error", "Login to delete question", "error");
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`/questions/${questionId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire(
                'Deleted!',
                'Your Question has been deleted.',
                'success'
              )
              setQuestions((prevQuestions) =>
              prevQuestions.filter((question) => question.id !== questionId)
            );
              nav("/questions");
            } else {
              Swal.fire("Error", "Failed to delete question", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting question:", error);
            Swal.fire("Error", "Failed to delete question", "error");
          });
      }
    }) 
  };

  // Search questions
  const searchQuestions = (searchTerm) => {

    fetch(`/questions/search?q=${encodeURIComponent(searchTerm)}`, {
      method: "GET",
      headers: {
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
      });
  };

  ///Upvote question
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

    ///Downvote questions
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

 /// Upvote answers
const upvoteAnswer = (answerId) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;

  fetch(`/answers/${answerId}/upvote`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Upvoted answer successfully.') {
        // Find the question that contains the answer by its ID
        const updatedQuestions = questions.map((q) => {
          const updatedAnswers = q.answers.map((a) => {
            if (a.id === answerId) {
              // Update the upvotes_count and downvotes_count of the answer
              return {
                ...a,
                upvotes_count: data.upvotes_count,
                downvotes_count: data.downvotes_count,
              };
            }
            return a;
          });

          // Update the answers of the question
          return {
            ...q,
            answers: updatedAnswers,
          };
        });

        // Update the state with the updated questions
        setQuestions(updatedQuestions);
      }
    })
    .catch((error) => {
      console.error("Error upvoting answer:", error);
    });
};

/// Downvote answers
const downvoteAnswer = (answerId) => {
  const token = sessionStorage.getItem("token");
  if (!token) return;

  fetch(`/answers/${answerId}/downvote`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Downvoted answer successfully.') {
        // Find the question that contains the answer by its ID
        const updatedQuestions = questions.map((q) => {
          const updatedAnswers = q.answers.map((a) => {
            if (a.id === answerId) {
              // Update the upvotes_count and downvotes_count of the answer
              return {
                ...a,
                upvotes_count: data.upvotes_count,
                downvotes_count: data.downvotes_count,
              };
            }
            return a;
          });

          // Update the answers of the question
          return {
            ...q,
            answers: updatedAnswers,
          };
        });

        // Update the state with the updated questions
        setQuestions(updatedQuestions);
      }
    })
    .catch((error) => {
      console.error("Error downvoting answer:", error);
    });
};

  
  ///Favorite questions
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
    if (!Array.isArray(favoriteQuestions)) {
      return false; // Or handle the case when favoriteQuestions is not an array
    }
    
    return favoriteQuestions.some((favorite) => favorite.id === questionId);
  };

  // Report a question
  const report = (reportData) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    Swal.fire("Error", "Login to report question", "error");
    return;
  }

  fetch("/reported_contents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reportData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        Swal.fire("Error", data.errors[0], "error");
      } else if (data.message) {
        setReportSuccess(true);
        nav(`/questions`);
        Swal.fire("Success", data.message, "success");
        setIsReporting(false);
      }
    })
    .catch((error) => {
      console.error("Error reporting question:", error);
      Swal.fire("Error", "Failed to report question", "error");
    });
  };

  // notifications
  const fetchNotifications = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;
      const response = await axios.get('/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;
  
      // Mark the notification as read in the state to reflect the change instantly
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, read_status: true } : notification
        )
      );
  
      // Send the PATCH request to mark the notification as read on the server
      const response = await axios.patch(
        `/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  const contextData = {
    questions,
    createAnswer,
    fetchQuestions,
    createQuestion,
    deleteQuestion,
    searchQuestions,
    fetchTags,
    toggleFavorite,
    tags,
    notifications,
    upvoteQuestion,
    downvoteQuestion,
    upvoteAnswer,
    downvoteAnswer,
    favoriteQuestions,
    fetchFavoriteQuestions,
    isQuestionFavorited,
    report,
    isReporting,
    reportSuccess,
    setIsReporting,
    fetchNotifications,
    markNotificationAsRead,
  };

  return (
    <QuestionsContext.Provider value={contextData}>
      {children}
    </QuestionsContext.Provider>
  );
}
