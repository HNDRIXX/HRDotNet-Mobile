const STRINGS = {
    fillFormError: "Please complete your request form.",
    
    fileNote: "Note: Maximum upload file size is limited to 25 MB. Accepted file types: .doc, .docx, .jpg, .jpeg, .png, .txt, and .pdf.",

    invalidError: "Invalid file format. Only files with the following extensions are allowed: .doc, .docx, .jpg, .png, .txt, and .pdf.",

    sizeError: "The file exceeds the allowable limit and cannot be uploaded.",

    requestSummary: "Please review your details below before submitting.",

    fileSizeError: "File Too Large', 'Please select a file with a size of 5MB or less.",
    fileFormatError: "Unsupported File Format', 'Please select a docx, pdf, jpeg, jpg, or txt file.",

    pendingCOSConfirmation: (pendingCount, checkCount) => `There are <b>pending COS requests</b> for <b><u>${pendingCount} out of ${checkCount}</u></b> <b>selected OB requests.</b> Kindly review and decide on the unresolved applications to be made available for approval or cancellation.${'\n\n'} In the meantime, the <b><u>${pendingCount} other selected OB requests</u></b> will be <b><u>approved.</u></b>${'\n'}Continue?`,

    approvalsConfirmation: (checkCount) => `<b><u>${checkCount} COS Request/s</u></b> are selected for <b><u>approval.</u></b>${'\n'}Continue?`,

    approvalSuccess: (prevCount) => `You have successfully approved${'\n'}<b><u>${prevCount} OB Request/s!</u></b>`,
}

export { STRINGS }