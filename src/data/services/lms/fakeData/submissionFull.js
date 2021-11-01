import submissionList from './submissionList';

const responseText = (submissionId) => `<div><h1>Title (${submissionId})</h1>
Phasellus tempor eros aliquam ipsum molestie, vitae varius lectus tempus. Morbi iaculis, libero euismod vehicula rutrum, nisi leo volutpat diam, quis commodo ex nunc ut odio. Pellentesque condimentum feugiat erat ac vulputate. Pellentesque porta rutrum sagittis. Curabitur vulputate tempus accumsan. Fusce bibendum gravida metus a scelerisque. Mauris fringilla orci non lobortis commodo. Quisque iaculis, quam a tincidunt vehicula, erat nisi accumsan quam, eu cursus ligula magna id odio. Nulla porttitor, lorem gravida vehicula tristique, sapien metus tristique ex, id tincidunt sapien justo nec sapien. Maecenas luctus, nisl vestibulum scelerisque pharetra, ligula orci vulputate turpis, in ultrices mauris dolor eu enim. Suspendisse quis nibh nec augue semper maximus. Morbi maximus eleifend magna.

Phasellus porttitor vel magna et auctor. Nulla porttitor convallis aliquam. Donec cursus, ipsum ut egestas bibendum, purus metus dignissim est, ac condimentum leo felis eget diam. In magna mi, tincidunt id sapien id, fermentum vestibulum quam. Quisque et dui sed urna convallis rutrum pellentesque quis sapien. Cras non lectus velit. Praesent semper eros id risus mollis, quis interdum quam imperdiet. Sed nec vulputate tortor, at tristique tortor.
</div>`;

const descriptiveText = (fileName) => `This is some descriptive text for (${fileName}). Phasellus tempor eros aliquam ipsum molestie, vitae varius lectus tempus. Morbi iaculis, libero euismod vehicula rutrum, nisi leo volutpat diam, quis commodo ex nunc ut odio. Pellentesque condimentum feugiat erat ac vulputate. Pellentesque porta rutrum sagittis. Curabitur vulputate tempus accumsan. Fusce bibendum gravida metus a scelerisque. Mauris fringilla orci non lobortis commodo. Quisque iaculis, quam a tincidunt vehicula, erat nisi accumsan quam, eu cursus ligula magna id odio. Nulla porttitor, lorem gravida vehicula tristique, sapien metus tristique ex, id tincidunt sapien justo nec sapien. Maecenas luctus, nisl vestibulum scelerisque pharetra, ligula orci vulputate turpis, in ultrices mauris dolor eu enim. Suspendisse quis nibh nec augue semper maximus. Morbi maximus eleifend magna.`;

const allFiles = [
  'presentation.pdf',
  'example.jpg',
  'diagram.png',
  'notes.doc',
  'recording.wav',
];

const pdfs = [
  'pdfs/edX_2021_Internal_BrandTMGuidelines_v1.0.9.pdf',
  'pdfs/irs_p5564.pdf',
  'pdfs/mit_Cohen_GRL16.pdf',
];

const getFiles = (submissionId) => {
  const index = parseInt(submissionId.split('-')[1], 10);
  const numFiles = index % allFiles.length;
  const files = [];
  for (let i = 0; i < numFiles; i++) {
    const fileName = `${submissionId}_${allFiles[i]}`;
    files.push({
      name: fileName,
      description: descriptiveText(fileName),
      downloadUrl: pdfs[i % pdfs.length],
    });
  }
  return files;
};

// eslint-disable-next-line
export const mockSubmission = (submissionId) => ({
  response: {
    text: responseText(submissionId),
    files: getFiles(submissionId),
  },
  gradeStatus: submissionList[submissionId].gradeStatus,
  lockStatus: submissionList[submissionId].lockStatus,
  score: submissionList[submissionId].score,
});

export const mockSubmissionStatus = (submissionId) => ({
  gradeData: submissionList[submissionId].gradeData,
  gradeStatus: submissionList[submissionId].gradeStatus,
  lockStatus: submissionList[submissionId].lockStatus,
});
