import React, { useState, useContext} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { QuestionsContext } from '../context/QuestionsContext';

const ReportContent = ({ contentType, contentId }) => {
  const [reason, setReason] = useState('');
  const { id } = useParams();
  const { isReporting, reportSuccess, report, setIsReporting } = useContext(QuestionsContext);
  const handleReport = async () => {
    
    setIsReporting(true);
    const reportData = {
      question_id: id,
      reason: reason,
    }
   report(reportData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Report Inappropriate Content</h3>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for the report"
        rows="4"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <button
        onClick={handleReport}
        disabled={isReporting}
        className={`w-full py-2 rounded-lg ${
          isReporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isReporting ? 'Reporting...' : 'Report'}
      </button>
      {reportSuccess && <p className="mt-4 text-green-500">Content reported successfully.</p>}
    </div>
  );
};

export default ReportContent;
