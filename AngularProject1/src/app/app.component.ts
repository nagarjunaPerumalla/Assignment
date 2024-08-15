import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


interface EmployerJsonData {
  EmployeeName: string;
  StarTimeUtc: string;
  EndTimeUtc: string;
  EntryNotes: string;
  DeletedOn: string;
}
interface EmployerData {
  EmployeeName: string;
  TotalTime: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employerdata: EmployerData[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getemployerdata();
  }
  getemployerdata() {
    this.http.get<EmployerJsonData[]>("https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==").subscribe(
      (result) => {
        // Apply group by condtion to get data based on employername then calculte of all the individual hours spent by each employee
        result.forEach(e => {
          this.employerdata.push({
            EmployeeName: e.EmployeeName,
            TotalTime: Date.parse(e.EndTimeUtc) - Date.parse(e.StarTimeUtc)
          });
        });
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularapp1.client';
}
