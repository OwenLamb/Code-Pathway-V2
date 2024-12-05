document.getElementById("Submit").addEventListener("click", async function() {
    let textareaContent = document.getElementById("UserCode").value;

    let AIResponseDiv = document.getElementById('AIResponse');
    AIResponseDiv.classList.remove('hidden');

    try {
        // Send user code to the backend for evaluation
        let response = await fetch('http://127.0.0.1:5000/evaluate_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: textareaContent,
                question: "Write a program that checks if a variable 'age' is: Less than 13: print 'You are a child', Between 13 and 19: print 'You are a teenager', 20 or older: print 'You are an adult'"
            })
        });

        let result = await response.json();
        let feedback = result.feedback;

        // Display AI's feedback
        AIResponseDiv.innerHTML = feedback;

        // Check if the AI response indicates success
        if (feedback.toLowerCase().startsWith("correct")) {
            userQuizGrade = true;
            document.getElementById('Continue').classList.remove('hidden');
        } else {
            alert("Incorrect. Please try again.");
        }
    } catch (error) {
        AIResponseDiv.innerHTML = "Error communicating with the backend. Please try again.";
        console.error('Error:', error);
    }
});

document.getElementById("Continue").addEventListener("click", function() {
    if (userQuizGrade) {
        window.location.href = 'Lesson3.html';
    } else {
        alert("You have not yet passed the quiz");
    }
});
