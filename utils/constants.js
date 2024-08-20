


export const JOB_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
};



export const JOB_TYPE = {
    FORM_WORK: 'form-work',
    CONCRETING: 'concreting',
    WELDER: 'welding',
    ELECTRICIAN: 'electrical',
    PLUMBER: 'plumbing',
    CONSTRUCTION_WORKER: 'construction-worker',
    ROOFER: 'roofing',
    PAINTER: 'painting',
    SURVEYOR: 'surveyor',
    TILER: 'tiler',
};

/**
 * JOB_SORT_BY object defines possible ways jobs can be sorted.
 * @type {Object.<string, string>}
 * @property {string} NEWEST_FIRST - sorting jobs by newest first.
 * @property {string} OLDEST_FIRST - sorting jobs by oldest first.
 * @property {string} ASCENDING - sorting jobs in ascending order (A-Z).
 * @property {string} DESCENDING - sorting jobs in descending order (Z-A).
 */
export const JOB_SORT_BY = {
    NEWEST_FIRST: 'newest',
    OLDEST_FIRST: 'oldest',
    ASCENDING: 'a-z',
    DESCENDING: 'z-a',
};
