import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.scss'],
})
export class SoonComponent implements OnInit {
  type: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // redirect to login page after 5 s
    this.type = this.route.snapshot.queryParams.type;
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 5000);
  }
}
