import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5LCBqC8lO5cH2qZAF4zAHCOjBTRpWmOo",
  authDomain: "dashboard-fa043.firebaseapp.com",
  projectId: "dashboard-fa043",
  storageBucket: "dashboard-fa043.firebasestorage.app",
  messagingSenderId: "656857365230",
  appId: "1:656857365230:web:f0ed41b09756bc849c11ff",
  measurementId: "G-NSX5XV7QHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserName").innerText = userData.name;
          document.getElementById("loggedUserEmail").innerText = userData.email;
        } else {
          console.log("no document found matching id");
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      });
  } else {
    console.log("User Id not Found in Local storage");
  }
});

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error Signing out:", error);
    });
});

// For handling tab switching
const tabs = document.querySelectorAll(".course-box ul li");
const courses = document.querySelectorAll(".course .box");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    tabs.forEach((tab) => tab.classList.remove("active"));

    // Add active class to the clicked tab
    tab.classList.add("active");

    // Hide all courses
    courses.forEach((course) => (course.style.display = "none"));

    // Show the courses related to the selected tab
    if (index === 0) {
      // In Progress
      document.querySelectorAll(".course .box").forEach((box, idx) => {
        box.style.display =
          idx === 0 || idx === 1 || idx === 2 ? "block" : "none";
      });
    }
    if (index === 1) {
      // Explore
      // Show all courses (or add specific filter)
      document.querySelectorAll(".course .box").forEach((box) => {
        box.style.display = "block";
      });
    }
    if (index === 2) {
      // Incoming
      // Show only a specific set of courses (you can change the logic as needed)
      document.querySelectorAll(".course .box").forEach((box, idx) => {
        box.style.display = idx === 1 ? "block" : "none"; // Show only CSS course as incoming
      });
    }
    if (index === 3) {
      // Finished
      // Show no courses, or the ones that are finished
      document.querySelectorAll(".course .box").forEach((box, idx) => {
        box.style.display = idx === 3 ? "block" : "none";
      });
    }
  });
});

// For handling the "Continue" button
const continueButtons = document.querySelectorAll(".box button");
continueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Continue to the next lesson!");
    // You can replace the above line with navigation to a specific course page or functionality
  });
});
