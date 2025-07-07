document.querySelector('button').addEventListener('click', () => {
  document.querySelectorAll('.card').forEach((card) => {
    card.classList.toggle('dealing-animation') // Toggle the flip animation
  })
})
