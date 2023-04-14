// global array to store player data
const PlayersData = [];

function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();
  const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
  document.getElementById("age").value = age;
}

function Register() {
    // get form data
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let dob = new Date(document.getElementById("dob").value);
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value;
  
    // validate form data
    let valid = true;
    if (firstName.length < 4) {
      alert("First Name must be at least 4 characters long");
      valid = false;
    }
    if (lastName.length < 4) {
      alert("Last Name must be at least 4 characters long");
      valid = false;
    }
    let age = calculateAge();
    if (age < 8 || age > 12) {
      alert("Age must be between 8 and 12 inclusive");
      valid = false;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Email address must end with '@gmail.com'");
      valid = false;
    }
  
    if (valid) {
      // create player object with full name
      let player = {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
        email: email,
        score: 0,
        total: 0
      };
  
      // add player to array
      PlayersData.push(player);
  
      // clear form and disable fields
      document.getElementById("first-name").value = "";
      document.getElementById("last-name").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("email").value = "";
      document.getElementById("first-name").disabled = true;
      document.getElementById("last-name").disabled = true;
      document.getElementById("dob").disabled = true;
      document.getElementById("gender").disabled = true;
      document.getElementById("email").disabled = true;
  
      // enable start button and end button
      document.getElementById("start-btn").disabled = false;
      document.getElementById("end-btn").disabled = false;
  
      // disable register button
      document.getElementById("register-btn").disabled = true;
    }
  }

  function PlayGame() {
        // Define an array of words to choose from
        const words = ["apple", "banana", "cherry", "orange", "strawberry", "watermelon"];
    
        // Select a random word from the array
        const randomWord = words[Math.floor(Math.random() * words.length)];
    
        // Scramble the letters of the word
        const scrambledWord = randomWord
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    
        // Display the scrambled word in the game area
        const gameArea = document.getElementById("game-area");
        gameArea.value = scrambledWord;
    
        // Enable the answer field and accept button
        const answerField = document.getElementById("answer");
        answerField.removeAttribute("disabled");
        const acceptButton = document.getElementById("accept-btn");
        acceptButton.removeAttribute("disabled");
    }
   
    
    function CheckAnswer() {
      const answerInput = document.getElementById('answer');
      const playerAnswer = answerInput.value.trim().toLowerCase();
      const scrambledWord = document.getElementById('game-area').value.trim().toLowerCase();
      console.log('Scrambled word:', scrambledWord);
      console.log('Player answer:', playerAnswer);
  
      // Validate answer input
      if (!playerAnswer) {
          alert('Please provide an answer');
          return;
      }
  
      // Check if the player's answer matches the scrambled word
      const isCorrect = isAnagram(playerAnswer, scrambledWord);
  
      // Append to PlayersData array
      PlayersData.push({
          original: scrambledWord,
          answer: playerAnswer,
          correct: isCorrect
      });
  
      // Disable answer input and Accept button, and enable Next button
      answerInput.disabled = true;
      document.getElementById('accept-btn').disabled = true;
      document.getElementById('next-btn').disabled = false;
  
      // Display message indicating if the answer is correct or incorrect
      const message = isCorrect ? 'Correct!' : 'Incorrect!';
      alert(message);
  
      // clear the answer input and disable the Accept and Next buttons
      document.getElementById('answer').value = '';
      document.getElementById('accept-btn').disabled = true;
      document.getElementById('next-btn').disabled = false;
    
   showAll()
    }
    function showAll() {
      // Get a reference to the textarea element
      var textarea = document.getElementById("showallplayers");
  
      // Clear the textarea
      textarea.value = "";
  
      // Loop through each player in the playerData array
      for (let i = 0; i < PlayersData.length; i++) {
          // Format the player's data as a string
          var playerString = `Player ${i + 1}:\nOriginal Word: ${PlayersData[i].original}\nAnswer: ${PlayersData[i].answer}\nCorrect: ${PlayersData[i].correct}\n\n`;
  
          // Add the player's data to the textarea
          textarea.value += playerString;
      }
  }
  

function isAnagram(answer, original) {
    if (answer.length !== original.length) {
      return false;
    }
    
    const charCount = new Map();
    
    for (const char of original) {
      charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (const char of answer) {
      if (!charCount.has(char) || charCount.get(char) === 0) {
        return false;
      }
      charCount.set(char, charCount.get(char) - 1);
    }
    
    return true;}
function findPercentageScore() {
  // Count the number of questions and correct answers
  const totalQuestions = 6; // updated to 6 questions
  let correctAnswers = 0;
  for (let i = 0; i < PlayersData.length; i++) {
    if (PlayersData[i].correct) {
      correctAnswers++;
    }
  }

  // Calculate the percentage score
  const percentageScore = (correctAnswers / totalQuestions) * 100;

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Get the first and last name of the first player in the PlayersData array
  const firstName = PlayersData[0].firstName;
  const lastName = PlayersData[0].lastName;

  // Clear the showpercentage textarea and display the results
  const showpercentageTextarea = document.getElementById("showpercentage");
  showpercentageTextarea.value = "";
  showpercentageTextarea.value += `Total number of questions: ${totalQuestions}\n`;
  showpercentageTextarea.value += `Number of correct answers: ${correctAnswers}\n`;
  showpercentageTextarea.value += `Percentage score: ${percentageScore}%\n`;
  showpercentageTextarea.value += `First name: ${firstName}\n`;
  showpercentageTextarea.value += `Last name: ${lastName}\n`;
  showpercentageTextarea.value += `Date: ${currentDate}`;
    }
  