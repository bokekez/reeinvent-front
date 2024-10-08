import React, { useContext, useEffect, useState } from 'react';
import { getActiveModel, switchModel } from '../apiService/modelApi';
import '../componentStyles/Model.css';
import { ModelContext } from '../context/modelContext';
import questionMark from '../resources/question.png';
import { useNavigate } from 'react-router-dom';

const Model = () => {
  const { model, setModel } = useContext(ModelContext);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getModel = async () => {
      const result = await getActiveModel();
      if (result) {
        setModel(result);
      }
    };

    getModel();
  }, [model, setModel]);

  const handleModelChange = async (value) => {
    const result = await switchModel(value);
    if (result) {
      setModel(value);
      navigate(0);
    }
  };

  const handleInfo = () => {
    setShowInfo(showInfo === false ? true : false);
  };

  return (
    <div className="model">
      <p>Active Model:</p>
      <div className="model-container">
        <button
          className={`${model === 'basic' ? 'active' : ''}`}
          onClick={() => handleModelChange('basic')}
        >
          Basic
        </button>
        <button
          className={`${model === 'transitive' ? 'active' : ''}`}
          onClick={() => handleModelChange('transitive')}
        >
          Transitive
        </button>
        <img
          src={questionMark}
          alt="Question Mark"
          className="model-question"
          onClick={handleInfo}
        />
      </div>
      {showInfo && (
        <div onClick={handleInfo} className="model-info">
          <p>
            Basic model: Words and synonyms are symetrical, if A is a synonym of
            B and B is a synonym of C, then A, B and C are all syonoyms.
          </p>
          <p>
            Transitive model: Words and synonyms are not symetrical, if A is a
            synonym of B and B is a synonym of C, then A and C are transitive
            synoyms.
          </p>
          <button>X</button>
        </div>
      )}
    </div>
  );
};

export default Model;
