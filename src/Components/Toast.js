export function Toast(message, duration = 2000) {
  const containerId = "toast-container";

  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.top = "1rem";
    container.style.right = "1rem";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "0.5rem";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "0.75rem 1.25rem";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.cursor = "pointer";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.5s ease";

  toast.addEventListener("click", () => {
    toast.style.opacity = "0";
    setTimeout(() => {
      container.removeChild(toast);
    }, 500);
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 500);
  }, duration);
}
