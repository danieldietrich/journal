document.addEventListener('DOMContentLoaded', (event) => {
  // SVG icon for the copy button
  const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24 v24H0z" fill="none"/>
          <path d="M16 1H4c-1.1 0-1.99.9-1.99 2L2 17h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>`;

  // Select all code blocks within the `.post` class element
  const codeBlocks = document.querySelectorAll('.post pre code');

  codeBlocks.forEach((codeBlock) => {
      // Create a copy button
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.setAttribute("data-tooltip", "Copy to clipboard");
      button.type = 'button';
      button.ariaLabel = 'Copy code to clipboard';
      button.innerHTML = svgIcon;

      // Wrap code block inside a container
      const preBlock = codeBlock.parentNode;
      const container = document.createElement('div');
      container.className = 'code-container';
      preBlock.parentNode.insertBefore(container, preBlock);
      container.appendChild(preBlock);

      // Insert the copy button just before the <pre> block
      preBlock.before(button);

      // Event listener for the copy button
      button.addEventListener('click', () => {
          const codeToCopy = codeBlock.innerText;
          navigator.clipboard.writeText(codeToCopy).then(() => {
              console.log('Code copied to clipboard!');
              // Optionally, provide user with feedback that text has been copied.
          }).catch(err => {
              console.error('Failed to copy text', err);
          });
      });
  });
});
