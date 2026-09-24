const refreshButton = document.querySelector("#refresh-status");
const lastUpdatedText = document.querySelector("#last-updated");

function updateStatusTimestamp() {
  const currentTime = new Date();

  const formattedTime = currentTime.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "medium"
  });

  lastUpdatedText.textContent = `Last checked: ${formattedTime}`;
}

refreshButton.addEventListener("click", updateStatusTimestamp);

updateStatusTimestamp();