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
}
