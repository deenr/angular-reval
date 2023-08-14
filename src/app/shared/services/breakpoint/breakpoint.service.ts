import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Breakpoint} from './breakpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public currentBreakpoint: Breakpoint;
  public isMobile: boolean;
  public isTablet: boolean;

  private customBreakpoints = {
    XS: '(max-width: 375px)',
    SM: '(min-width: 376px) and (max-width: 640px)',
    MD: '(min-width: 641px) and (max-width: 768px)',
    LG: '(min-width: 769px) and (max-width: 1024px)',
    XL: '(min-width: 1025px)'
  };

  private customBreakpointsMap = new Map<string, Breakpoint>([
    ['(max-width: 375px)', Breakpoint.XS],
    ['(min-width: 376px) and (max-width: 640px)', Breakpoint.SM],
    ['(min-width: 641px) and (max-width: 768px)', Breakpoint.MD],
    ['(min-width: 769px) and (max-width: 1024px)', Breakpoint.LG],
    ['(min-width: 1025px)', Breakpoint.XL]
  ]);

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  public observe(): Observable<any> {
    const customBreakpointsValues = Object.values(this.customBreakpoints);
    return this.breakpointObserver.observe(customBreakpointsValues).pipe(
      map((breakpointState: BreakpointState) => {
        for (const query of Object.keys(breakpointState.breakpoints)) {
          if (breakpointState.breakpoints[query]) {
            this.currentBreakpoint = this.customBreakpointsMap.get(query);
            this.isMobile = this.currentBreakpoint === Breakpoint.SM || this.currentBreakpoint === Breakpoint.XS;
            this.isTablet = this.currentBreakpoint === Breakpoint.MD;
            return this.customBreakpointsMap.get(query);
          }
        }
        return null;
      })
    );
  }
}
