import {Component} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  public universities = ['Elysian Academy', 'Exemplar College', 'Synthesis University', 'Nexus Institute', 'Innovus Polytechnic'];
  public features = [
    {
      icon: 'toolbox',
      title: 'Seamless lending system',
      text: 'Easily access our extensive range of research equipment. From precision instruments to advanced machinery, we offer a diverse selection to cater to your needs.'
    },
    {
      icon: 'network',
      title: 'Share equipment availability',
      text: 'Effortlessly coordinate your research group with shared equipment availability. Ensure seamless collaboration when lending and requesting devices.'
    },
    {
      icon: 'document',
      title: 'Efficient document management',
      text: 'Upload and access essential documents for each device. Share user manuals and guides, empowering users to maximize equipment usage.'
    },
    {
      icon: 'bell',
      title: 'Real-time notifications',
      text: 'Stay updated with real-time alerts. Receive notifications about approved requests, due dates, and device availability changes.'
    },
    {
      icon: 'analytics',
      title: 'Device usage analytics',
      text: 'Gain valuable insights into device usage. Track patterns, optimize resource allocation and equipment procurement.'
    },
    {
      icon: 'clock',
      title: 'Flexible lending periods',
      text: `Tailor lending periods to your needs. Request customized borrowing durations for any research project.`
    }
  ];

  public faqs = [
    {
      question: 'How do I log in to the web application?',
      answer: 'To log in, simply use your Google, email, or university credentials. Logging in through your university grants instant approval, while other login methods require admin approval.'
    },
    {
      question: 'What types of devices are available for lending?',
      answer: 'Our database offers a wide range of research equipment, including precision instruments, laboratory machinery, and cutting-edge technologies specific to various fields of study.'
    },
    {
      question: 'How long can I borrow a device?',
      answer:
        'The lending period varies depending on the device and its availability. When making a lending request, you can specify the duration you require, and we will do our best to accommodate your needs.'
    },
    {
      question: 'How can I upload documents associated with a device?',
      answer: "You can easily upload relevant documents through the device profile page. Share user manuals, instructional guides, or any other valuable resources that enhance the device's usability."
    },
    {
      question: 'Can I remove a document that I have uploaded?',
      answer: 'Yes, as the user who uploaded a document, you have the authority to remove it if necessary. This ensures the accuracy and relevance of the shared resources.'
    },
    {
      question: 'How do admins manage lending requests and device usage?',
      answer: 'Our admins oversee the entire lending system. They review and approve lending requests, monitor device usage, and ensure fair distribution among users to maximize accessibility.'
    },
    {
      question: 'What happens if I need to cancel my lending request?',
      answer:
        'You can cancel your lending request without any problems. Simply contact our support team or navigate to your account settings to initiate the cancellation process. Our team will assist you in resolving the matter promptly and ensuring a smooth experience for you.'
    },
    {
      question: 'How are device usage statistics utilized by admins?',
      answer:
        'Admins utilize device usage statistics to gain valuable insights into equipment demand, usage patterns, and overall utilization. This data helps them make informed decisions about resource allocation and device procurement to optimize the lending system.'
    }
  ];
}
