document.addEventListener('DOMContentLoaded', () => {
  let players = [];
  let myId = null;

  const listEl     = document.getElementById('player-list');
  const countEl    = document.getElementById('player-count');
  const searchIn   = document.getElementById('search-input');
  const toggleBtn  = document.getElementById('search-toggle');
  const wrapper    = document.getElementById('search-wrapper');

  function getPingData(ping) {
    if (ping <= 50) {
      return {
        icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNGRmN2I4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMjBjLjgzIDAgMS41LS42NyAxLjUtMS41cy0uNjctMS41LTEuNS0xLjUtMS41LjY3LTEuNSAxLjUuNjcgMS41IDEuNSAxLjV6bTMuNzktMy4wMWMuNTktLjU5LjU5LTEuNTUgMC0yLjE0QzE0LjQxIDEzLjEgMTMuMjUgMTIgMTIgMTJzLTIuNDEuOS0zLjc5IDIuODVjLS41OS41OS0uNTkgMS41NSAwIDIuMTRzMS41NS41OSAyLjE0IDBDMTAuMDYgMTcuMTEgMTEuMDEgMTcuNSAxMiAxNy41czEuOTQtLjM5IDIuNzktMS4wMXptMi44OS0yLjg4YzEuMi0xLjItMS43NC0zLjY5LTYuNzgtMy42OS01LjA0IDAtNy45OCAyLjQ5LTYuNzggMy42OSAxLjEuNyAyLjU2LjU0IDMuNTQtLjA3Ljg1LS40OSA4Mi0uNDEgMy41NC4wNyAxLjIgMS4yIDMuNi0xLjItMy42OXoiLz48L3N2Zz4=',
        color: '#008537',
      };
    } else if (ping <= 150) {
      return {
        icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZjdkYzk0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMjBjLjgzIDAgMS41LS42NyAxLjUtMS41cy0uNjctMS41LTEuNS0xLjUtMS41LjY3LTEuNSAxLjUuNjcgMS41IDEuNSAxLjV6bTAtNWMuODMgMCAxLjUtLjY3IDEuNS0xLjVzLS42Ny0xLjUtMS41LTEuNS0xLjUuNjctMS41IDEuNS42NyAxLjUgMS41IDEuNXptMi4xNS0zLjE0Yy43NS0uNzUuNzUtMS45NyAwLTIuNzItLjU0LS41NC0xLjI3LS43OS0yLjAyLS43OS0uNzUgMC0xLjQ4LjI1LTIuMDIuNzktLjc1Ljc1LS43NSAxLjk3IDAgMi43Mi41NC41NCAxLjI3Ljc5IDIuMDIuNzkuNzUgMCAxLjQ4LS4yNSAyLjAyLS43OXoiLz48L3N2Zz4=',
        color: '#ac7d00',
      };
    } else {
      return {
        icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZjY0ZTQ0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMjBjLjgzIDAgMS41LS42NyAxLjUtMS41cy0uNjctMS41LTEuNS0xLjUtMS41LjY3LTEuNSAxLjUuNjcgMS41IDEuNSAxLjV6bTAtNWMuODMgMCAxLjUtLjY3IDEuNS0xLjVzLS42Ny0xLjUtMS41LTEuNS0xLjUuNjctMS41IDEuNS42NyAxLjUgMS41IDEuNXptMC01Yy44MyAwIDEuNS0uNjcgMS41LTEuNXMtLjY3LTEuNS0xLjUtMS41LTEuNS42Ny0xLjUgMS41LjY3IDEuNSAxLjUgMS41eiIvPjwvc3ZnPg==',
        color: '#fa1e1e',
      };
    }
  }
  
  function createRow(p, isYou = false, delay = 0) {
    const li = document.createElement('li');
    li.className = `player-row${isYou ? ' you' : ''}`;
    li.dataset.playerId = p.id;
    li.style.animationDelay = `${delay}ms`;
  
    const pingData = getPingData(p.ping);
  
    li.innerHTML = `
      <div class="player-name">
        <span class="player-id">${p.id}</span>
        <span>${p.name}</span>
      </div>
      <span class="ping-box" data-ping="${p.ping}" style="background: ${pingData.color};">
        ${p.ping}ms
      </span>
    `;
    return li;
  }
  
  function animatePing(el, start, end) {
    const duration = 500;
    const stepTime = 16;
    let current = start;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    let frame = 0;
  
    const updateStyle = (val) => {
      const { color } = getPingData(val);
      el.style.backgroundColor = color;
      el.textContent = `${val}ms`;
      el.dataset.ping = val;
    };
  
    const animate = () => {
      if (frame < steps) {
        current += increment;
        const val = Math.round(current);
        updateStyle(val);
        frame++;
        requestAnimationFrame(animate);
      } else {
        updateStyle(end);
      }
    };
  
    animate();
  }

  function render(filter = '') {
    const newPlayerMap = new Map();
    const filtered = players.filter(p =>
      p.name.toLowerCase().includes(filter) ||
      p.id.toString().includes(filter)
    );
  
    filtered.forEach(p => newPlayerMap.set(p.id, p));
  
    const currentRows = listEl.querySelectorAll('.player-row');
    const currentMap = new Map();
    currentRows.forEach(row => {
      const id = parseInt(row.dataset.playerId);
      currentMap.set(id, row);
    });
  
    currentMap.forEach((row, id) => {
      if (!newPlayerMap.has(id)) {
        row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        setTimeout(() => row.remove(), 300);
      }
    });
  
    let delay = 0;
    newPlayerMap.forEach((p, id) => {
      const isYou = p.id === myId;
      const existing = currentMap.get(id);
  
      if (!existing) {
        const row = createRow(p, isYou, delay);
        row.dataset.playerId = p.id;
        if (isYou) {
          listEl.prepend(row);
          const divider = document.createElement('li');
          divider.className = 'divider';
          divider.style.margin = '8px 0';
          listEl.insertBefore(divider, row.nextSibling);
        } else {
          listEl.append(row);
        }
      } else {
        const pingEl = existing.querySelector('.ping-box');
        const currentPing = parseInt(pingEl.innerText.replace(/[^\d]/g, '')) || 0;
        if (currentPing !== p.ping) {
          animatePing(pingEl, currentPing, p.ping);
        }
      }
  
      delay += 50;
    });
  
    countEl.textContent = `${filtered.length}/64 Players`;
  }

  searchIn.addEventListener('input', e =>
    render(e.target.value.trim().toLowerCase())
  );

  toggleBtn.addEventListener('click', () => {
    wrapper.classList.toggle('expanded');
    if (wrapper.classList.contains('expanded')) {
      searchIn.focus();
    } else {
      searchIn.value = '';
      render();
    }
  });

  window.addEventListener('message', function (event) {
    const data = event.data;

    if (data.action === 'updatePlayers') {
      players = data.players;
      myId = data.myId;
      render();
    } else if (data.action === 'show') {
      document.body.classList.add('visible');
      fetch(`https://${GetParentResourceName()}/startUpdatingPlayers`, { method: 'POST' });
    } else if (data.action === 'hide') {
      document.body.classList.remove('visible');
      fetch(`https://${GetParentResourceName()}/stopUpdatingPlayers`, { method: 'POST' });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fetch(`https://${GetParentResourceName()}/closeScoreboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  });
});
