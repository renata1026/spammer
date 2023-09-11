import React from 'react';

const YourComponent = () => {
  return (
    <div>
      <footer>
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://www.renata-reinartz.com">Renata Reinartz</a>
        </p>
      </footer>
    </div>
  );
};

export default YourComponent;
