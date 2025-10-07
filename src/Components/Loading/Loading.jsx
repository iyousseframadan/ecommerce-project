/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import style from './Loading.module.css'
import { FallingLines, Oval } from 'react-loader-spinner';


export default function Loading() {
    
  return (
    <FallingLines
      color="#0f766e"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
    />
  );
}
