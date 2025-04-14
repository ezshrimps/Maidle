let songs = [];

fetch('src/data/songs.json')
  .then(res => res.json())
  .then(data => songs = data);

const input = document.getElementById('search');
const suggestions = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const text = input.value.trim().toLowerCase();
  suggestions.innerHTML = '';

  if (text === '') return;

  const matches = songs.filter(song =>
    song.title.toLowerCase().includes(text)
  ).slice(0, 10);

  matches.forEach(song => {
    const div = document.createElement('div');
    div.classList.add('suggestion-item');
    div.textContent = song.title;
    div.addEventListener('click', () => {
      input.value = song.title;
      suggestions.innerHTML = '';
    });
    suggestions.appendChild(div);
  });
});
