import React from 'react'
import LegalDocument from '@/app/components/legal/LegalDocument'

export const metadata = {
  title: 'Terms of Service - OnlyScans',
  description: 'Terms of Service for OnlyScans document scanning application',
}

export default function TermsOfService() {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p>
            By downloading, installing, or using the OnlyScans mobile application (the "App"), you agree to be bound by
            these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.
          </p>
          <p className='mt-4'>
            These Terms constitute a legally binding agreement between you and OnlyScans. You must be at least 13 years
            old to use this App.
          </p>
        </>
      ),
    },
    {
      id: 'license',
      title: '2. License to Use',
      content: (
        <>
          <p>
            Subject to your compliance with these Terms, OnlyScans grants you a limited, non-exclusive,
            non-transferable, revocable license to use the App for personal, non-commercial purposes.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Restrictions</h3>
          <p>You agree NOT to:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Modify, reverse engineer, decompile, or disassemble the App</li>
            <li>Remove any copyright or proprietary notices from the App</li>
            <li>Use the App for any illegal or unauthorized purpose</li>
            <li>Attempt to gain unauthorized access to any systems or networks</li>
            <li>Use the App in any way that could damage, disable, or impair the service</li>
            <li>Redistribute, sell, or sublicense the App to third parties</li>
          </ul>
        </>
      ),
    },
    {
      id: 'user-responsibilities',
      title: '3. User Responsibilities',
      content: (
        <>
          <p>You are responsible for:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>
              <strong>Lawful Use:</strong> Using the App only for lawful purposes and in compliance with all applicable
              laws and regulations
            </li>
            <li>
              <strong>Document Content:</strong> Ensuring you have the right to scan and store any documents you process
              through the App
            </li>
            <li>
              <strong>Device Security:</strong> Maintaining the security of your device and protecting access to your
              scanned documents
            </li>
            <li>
              <strong>Account Security:</strong> Keeping your Google account credentials (if using Google Drive
              integration) secure and confidential
            </li>
          </ul>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Prohibited Uses</h3>
          <p>You agree NOT to scan or process:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Documents you do not have legal rights to reproduce or distribute</li>
            <li>Copyrighted materials without proper authorization</li>
            <li>Documents containing illegal content</li>
            <li>Sensitive documents in violation of privacy laws or regulations</li>
          </ul>
        </>
      ),
    },
    {
      id: 'google-drive-terms',
      title: '4. Google Drive Integration',
      content: (
        <>
          <p>
            If you choose to use the Google Drive integration feature, you acknowledge and agree that:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>You are solely responsible for your Google account and Google Drive storage</li>
            <li>
              OnlyScans is not responsible for any interruptions, errors, or loss of data caused by Google Drive
              service
            </li>
            <li>
              Your use of Google Drive is subject to{' '}
              <a
                href='https://policies.google.com/terms'
                target='_blank'
                rel='noopener noreferrer'
                className='text-nord-highlight-2 hover:text-nord-highlight-3 underline'
              >
                Google's Terms of Service
              </a>
            </li>
            <li>You have full control over Google Drive permissions and can revoke access at any time</li>
            <li>OnlyScans does not guarantee continuous availability of Google Drive integration</li>
          </ul>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      content: (
        <>
          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>OnlyScans Ownership</h3>
          <p>
            OnlyScans and its licensors own all rights, title, and interest in and to the App, including all
            intellectual property rights. These Terms do not grant you any ownership rights to the App.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Your Content</h3>
          <p>
            You retain all rights to the documents you scan using the App. OnlyScans does not claim any ownership or
            rights to your scanned documents.
          </p>
        </>
      ),
    },
    {
      id: 'disclaimer',
      title: '6. Disclaimer of Warranties',
      content: (
        <>
          <div className='bg-nord-accent-2 border border-nord-warning/50 rounded-lg p-6'>
            <p className='font-medium'>
              THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT.
            </p>
          </div>
          <p className='mt-4'>OnlyScans does not warrant that:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>The App will be error-free, uninterrupted, or completely secure</li>
            <li>Scan quality will meet your specific requirements</li>
            <li>Any errors or defects will be corrected</li>
            <li>The App will be compatible with all devices or operating systems</li>
          </ul>
        </>
      ),
    },
    {
      id: 'limitation-liability',
      title: '7. Limitation of Liability',
      content: (
        <>
          <div className='bg-nord-accent-2 border border-nord-error/50 rounded-lg p-6'>
            <p className='font-medium'>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ONLYSCANS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </div>
          <p className='mt-4'>This includes, but is not limited to, damages resulting from:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Loss or corruption of scanned documents</li>
            <li>Failure of Google Drive integration or Google services</li>
            <li>Unauthorized access to your device or accounts</li>
            <li>Errors in document scanning or processing</li>
            <li>Inability to use the App or its features</li>
          </ul>
        </>
      ),
    },
    {
      id: 'indemnification',
      title: '8. Indemnification',
      content: (
        <>
          <p>
            You agree to indemnify, defend, and hold harmless OnlyScans and its affiliates from any claims, damages,
            losses, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Your use or misuse of the App</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any laws or third-party rights</li>
            <li>Documents you scan or process using the App</li>
          </ul>
        </>
      ),
    },
    {
      id: 'termination',
      title: '9. Termination',
      content: (
        <>
          <p>
            OnlyScans reserves the right to terminate or suspend your access to the App at any time, with or without
            notice, for any reason, including violation of these Terms.
          </p>
          <p className='mt-4'>
            You may stop using the App at any time by uninstalling it from your device. Upon termination:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Your license to use the App immediately terminates</li>
            <li>You must cease all use of the App</li>
            <li>Locally stored documents remain on your device under your control</li>
            <li>Documents in Google Drive remain in your Google account</li>
          </ul>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: '10. Governing Law and Disputes',
      content: (
        <>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            OnlyScans operates, without regard to conflict of law principles.
          </p>
          <p className='mt-4'>
            Any disputes arising from these Terms or your use of the App shall be resolved through binding arbitration,
            except where prohibited by law. You waive any right to participate in class action lawsuits or class-wide
            arbitration.
          </p>
        </>
      ),
    },
    {
      id: 'changes-terms',
      title: '11. Changes to Terms',
      content: (
        <>
          <p>
            OnlyScans reserves the right to modify these Terms at any time. When we make changes, we will update the
            "Last Updated" date and post the revised Terms in the App and on our website.
          </p>
          <p className='mt-4'>
            Significant changes will be communicated through the App or via email if we have your contact information.
            Your continued use of the App after changes constitutes acceptance of the modified Terms.
          </p>
        </>
      ),
    },
    {
      id: 'miscellaneous',
      title: '12. Miscellaneous',
      content: (
        <>
          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Entire Agreement</h3>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and OnlyScans
            regarding the App.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Severability</h3>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will
            remain in full force and effect.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>No Waiver</h3>
          <p>
            Failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other
            provision.
          </p>
        </>
      ),
    },
    {
      id: 'contact-terms',
      title: '13. Contact',
      content: (
        <>
          <p>If you have questions about these Terms of Service:</p>
          <div className='bg-nord-accent-2 border border-nord-main-border rounded-lg p-6 mt-4'>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href='mailto:kristijankocev1234@gmail.com'
                className='text-nord-highlight-2 hover:text-nord-highlight-3 underline'
              >
                kristijankocev1234@gmail.com
              </a>
            </p>
            <p className='mt-2'>
              <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
            </p>
          </div>
        </>
      ),
    },
  ]

  return (
    <LegalDocument
      title='Terms of Service'
      lastUpdated='January 31, 2026'
      sections={sections}
      backLink='/onlyscans'
      backLinkText='Back to OnlyScans'
    />
  )
}
