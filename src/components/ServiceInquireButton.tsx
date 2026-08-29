"use client";

import { useState } from 'react';
import ServiceInquiryModal from './ServiceInquiryModal';

type Props = {
  serviceName: string;
  servicePrice?: string;
  whatsappNumber?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ServiceInquireButton({ serviceName, servicePrice, whatsappNumber, className, children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className={className || "button button--light"}
      >
        {children || `Inquire Now ↗`}
      </button>
      
      <ServiceInquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={serviceName}
        servicePrice={servicePrice}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
