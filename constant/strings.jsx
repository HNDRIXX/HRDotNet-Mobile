const STRINGS = {
    fillFormError: "Please complete your request form.",
    
    fileNote: "Note: Maximum upload file size is limited to 25 MB. Accepted file types: .doc, .docx, .jpg, .jpeg, .png, .txt, and .pdf.",

    invalidError: "Invalid file format. Only files with the following extensions are allowed: .doc, .docx, .jpg, .png, .txt, and .pdf.",

    sizeError: "The file exceeds the allowable limit and cannot be uploaded.",

    requestSummary: "Please review your details below before submitting.",

    fileSizeError: "File Too Large', 'Please select a file with a size of 5MB or less.",
    fileFormatError: "Unsupported File Format', 'Please select a docx, pdf, jpeg, jpg, or txt file.",

    aboutTheCompany: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida eleifend ante non venenatis. Sed et laoreet libero. Sed consequat dui a quam malesuada facilisis. Aenean eget dictum odio. Mauris eu massa ut nunc vehicula porttitor vitae eget turpis. Nunc imperdiet elit ipsum, in sagittis turpis imperdiet sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

    In scelerisque egestas urna et lobortis. Proin erat risus, aliquam in dignissim sit amet, posuere nec velit. In pharetra ligula ligula, vitae suscipit ante blandit eu. Curabitur sed est pulvinar, placerat ligula sed, lacinia augue. Curabitur volutpat cursus dui at fermentum. Sed a quam scelerisque diam iaculis porttitor in sed augue. Curabitur vulputate varius vehicula. Suspendisse potenti. Suspendisse ultrices urna et ultricies laoreet. Nulla pretium ultricies volutpat. In pulvinar placerat dolor vel vulputate.`,

    pendingCOSConfirmation: (pendingCount, checkCount) => `There are <b>pending COS requests</b> for <b><u>${pendingCount} out of ${checkCount}</u></b> <b>selected OB requests.</b> Kindly review and decide on the unresolved applications to be made available for approval or cancellation.${'\n\n'} In the meantime, the <b><u>${pendingCount} other selected OB requests</u></b> will be <b><u>approved.</u></b>${'\n'}Continue?`,

    approvalsConfirmation: (checkCount) => `<b><u>${checkCount} COS Request/s</u></b> are selected for <b><u>approval.</u></b>${'\n'}Continue?`,

    approvalSuccess: (prevCount) => `You have successfully approved${'\n'}<b><u>${prevCount} OB Request/s!</u></b>`,
}

export { STRINGS }