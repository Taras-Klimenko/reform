import React from 'react';
import FormPreview from '../components/FormPreview/FormPreview.component';

const PreviewPage = () => {
  return (
    <div>
      <h2>Preview Your Form</h2>
      <FormPreview steps={steps} />
    </div>
  );
};

export default PreviewPage;
