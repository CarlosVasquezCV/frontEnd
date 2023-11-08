import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentosEditPage } from './documentos-edit.page';

describe('DocumentosEditPage', () => {
  let component: DocumentosEditPage;
  let fixture: ComponentFixture<DocumentosEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentosEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
