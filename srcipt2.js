document.querySelector('button').addEventListener('click', () => {
  document.querySelectorAll('.card').forEach((card) => {
    card.classList.toggle('is-flipped') // Toggle the flip animation
  })
})
