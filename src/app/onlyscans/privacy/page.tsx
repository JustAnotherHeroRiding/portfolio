import React from 'react'
import LegalDocument from '@/app/components/legal/LegalDocument'

export const metadata = {
  title: 'Privacy Policy - OnlyScans',
  description: 'Privacy Policy for OnlyScans document scanning application',
}

export default function PrivacyPolicy() {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            OnlyScans ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, and safeguard your information when you use the OnlyScans mobile application (the "App").
          </p>
          <p>
            By using OnlyScans, you agree to the collection and use of information in accordance with this policy. If
            you do not agree with our policies and practices, do not use the App.
          </p>
        </>
      ),
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content: (
        <>
          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Permissions</h3>
          <p>To provide our document scanning services, the App requires the following permissions:</p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>
              <strong>Camera Access:</strong> Required to scan and capture documents using your device camera
            </li>
            <li>
              <strong>Storage Access:</strong> Required to save scanned documents to your device gallery
            </li>
            <li>
              <strong>Google Account Access (Optional):</strong> Only if you choose to enable Google Drive integration
              for automatic backup
            </li>
          </ul>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>What We Do NOT Collect</h3>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>We do not collect personal information such as your name, email, or phone number</li>
            <li>We do not track your location</li>
            <li>We do not use analytics or tracking tools</li>
            <li>We do not store your scanned documents on our servers</li>
          </ul>
        </>
      ),
    },
    {
      id: 'data-usage',
      title: '3. How We Use Your Data',
      content: (
        <>
          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Document Processing</h3>
          <p>
            All document scanning and image processing occurs locally on your device. Your scanned documents are
            processed in real-time and are never transmitted to our servers or any third-party servers (except Google
            Drive, if you enable that feature).
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Local Storage</h3>
          <p>
            Scanned documents are automatically saved to your device photo gallery. This data remains on your device
            and is under your complete control.
          </p>
        </>
      ),
    },
    {
      id: 'google-drive',
      title: '4. Google Drive Integration',
      content: (
        <>
          <p>
            OnlyScans offers optional Google Drive integration to automatically backup your scanned documents. This
            feature is entirely optional and requires your explicit authorization.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>OAuth Authorization</h3>
          <p>
            When you enable Google Drive backup, we request limited access to your Google account through Google OAuth
            2.0 authorization system. You will be directed to Google sign-in page where you can review and approve
            the requested permissions.
          </p>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Scopes Requested</h3>
          <div className='bg-nord-accent-2 border border-nord-main-border rounded-lg p-4'>
            <p className='font-mono text-sm text-nord-highlight-2'>
              https://www.googleapis.com/auth/drive.file
            </p>
            <p className='mt-2 text-sm'>
              <strong>Purpose:</strong> Allows OnlyScans to create and access only the files it creates in your Google
              Drive
            </p>
          </div>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>What We Access</h3>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>
              We <strong>ONLY</strong> access files that OnlyScans creates in your Google Drive
            </li>
            <li>
              We <strong>DO NOT</strong> access, read, or modify any other files or folders in your Drive
            </li>
            <li>
              We <strong>DO NOT</strong> store your Google credentials or access tokens on our servers
            </li>
            <li>Documents are uploaded directly from your device to your Google Drive</li>
          </ul>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>How It Works</h3>
          <ol className='list-decimal list-inside space-y-2 ml-4'>
            <li>You authorize OnlyScans to access your Google Drive through OAuth</li>
            <li>You choose which folder in your Drive to save documents to</li>
            <li>After each scan, the document is uploaded directly to your chosen folder</li>
            <li>The upload happens in the background without storing data on our servers</li>
          </ol>

          <h3 className='text-xl font-semibold text-nord-highlight-2 mt-6 mb-3'>Revoking Access</h3>
          <p>You can revoke OnlyScans access to your Google Drive at any time by:</p>
          <ol className='list-decimal list-inside space-y-2 ml-4'>
            <li>
              Visiting{' '}
              <a
                href='https://myaccount.google.com/permissions'
                target='_blank'
                rel='noopener noreferrer'
                className='text-nord-highlight-2 hover:text-nord-highlight-3 underline'
              >
                Google Account Permissions
              </a>
            </li>
            <li>Finding OnlyScans in the list of apps</li>
            <li>Clicking "Remove Access"</li>
          </ol>
          <p className='mt-2'>You can also disable Google Drive sync within the OnlyScans app settings.</p>
        </>
      ),
    },
    {
      id: 'data-storage',
      title: '5. Data Storage',
      content: (
        <>
          <ul className='space-y-3'>
            <li>
              <strong>Local Storage:</strong> Scanned documents are stored in your device photo gallery
            </li>
            <li>
              <strong>Google Drive:</strong> Only if you enable this feature; documents are stored in your personal
              Google Drive account under your control
            </li>
            <li>
              <strong>Our Servers:</strong> We <strong>DO NOT</strong> store any of your documents, scans, or Google
              Drive data on our servers
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'third-party',
      title: '6. Third-Party Services',
      content: (
        <>
          <p>
            OnlyScans integrates with Google Drive through the Google Drive API. When you use Google Drive integration,
            your use of Google Drive is also subject to{' '}
            <a
              href='https://policies.google.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-nord-highlight-2 hover:text-nord-highlight-3 underline'
            >
              Google Privacy Policy
            </a>
            .
          </p>
          <p className='mt-4'>We do not share your data with any other third-party services.</p>
        </>
      ),
    },
    {
      id: 'user-rights',
      title: '7. Your Rights',
      content: (
        <>
          <ul className='space-y-3'>
            <li>
              <strong>Access:</strong> You can access all your scanned documents in your device gallery or Google Drive
              at any time
            </li>
            <li>
              <strong>Deletion:</strong> Delete the app to remove all local data; delete files from your Drive to
              remove cloud backups
            </li>
            <li>
              <strong>Revoke Access:</strong> Revoke Google Drive permissions anytime through Google Account Settings
            </li>
            <li>
              <strong>Data Portability:</strong> Your documents are stored in standard image formats and can be
              transferred or exported at any time
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'limited-use',
      title: '8. Limited Use Disclosure',
      content: (
        <>
          <div className='bg-nord-accent-2 border-2 border-nord-highlight-2/50 rounded-lg p-6'>
            <p className='font-medium'>
              OnlyScans's use and transfer of information received from Google APIs adheres to{' '}
              <a
                href='https://developers.google.com/terms/api-services-user-data-policy'
                target='_blank'
                rel='noopener noreferrer'
                className='text-nord-highlight-2 hover:text-nord-highlight-3 underline'
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </div>
          <p className='mt-4'>
            This means we only use the data from Google APIs for the explicit purpose of providing and improving
            OnlyScans document backup functionality, and we do not transfer this data to others except as necessary to
            provide the service.
          </p>
        </>
      ),
    },
    {
      id: 'children',
      title: "9. Children's Privacy",
      content: (
        <>
          <p>
            OnlyScans is not intended for use by children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe your child has provided us
            with personal information, please contact us so we can delete such information.
          </p>
        </>
      ),
    },
    {
      id: 'security',
      title: '10. Data Security',
      content: (
        <>
          <p>
            Since all document processing happens locally on your device and we do not store your data on our servers,
            the security of your scanned documents depends on:
          </p>
          <ul className='list-disc list-inside space-y-2 ml-4'>
            <li>Your device security settings and password protection</li>
            <li>Your Google account security (if using Google Drive integration)</li>
          </ul>
          <p className='mt-4'>
            We recommend using strong passwords and enabling two-factor authentication on your Google account for
            maximum security.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      title: '11. Changes to This Policy',
      content: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
            reasons. When we make changes, we will update the "Last Updated" date at the top of this page.
          </p>
          <p className='mt-4'>
            Significant changes will be communicated through the App or via email if we have your contact information.
            Continued use of OnlyScans after changes indicates your acceptance of the updated policy.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      title: '12. Contact Information',
      content: (
        <>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or your data:</p>
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
      title='Privacy Policy'
      lastUpdated='January 31, 2026'
      sections={sections}
      backLink='/onlyscans'
      backLinkText='Back to OnlyScans'
    />
  )
}
