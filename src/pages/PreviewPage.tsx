import React from 'react';
import FormPreview from '../components/FormPreview/FormPreview.component';

const PreviewPage = () => {
  const steps = [
    {
      id: '1',
      title: 'Step 1: Email',
      content: (
        <div>
          <input type="email" placeholder="Enter your email" />
        </div>
      ),
    },
    {
      id: '2',
      title: 'Step 2: Password',
      content: (
        <div>
          <input type="password" placeholder="Enter your password" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Preview Your Form</h2>
      <FormPreview steps={steps} />
    </div>
  );
};

export default PreviewPage;
