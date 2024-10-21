CREATE TABLE Employe(
   Employe_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Email VARCHAR(50) UNIQUE NOT NULL,
   Password VARCHAR(50) NOT NULL,
   Nom VARCHAR(50),
   Prenom VARCHAR(50),
   Admin BOOLEAN,
   UNIQUE(Email)
);

CREATE TABLE Categorie(
   Categorie_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Categorie_Name VARCHAR(50),
   Employe_ID INT NOT NULL,
   PRIMARY KEY(Categorie_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID)
);

CREATE TABLE List(
   List_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   List_Name VARCHAR(50),
   List_Created_Date DATETIME,
   Personelles BOOLEAN,
   List_End_Date VARCHAR(50),
   List_End BOOLEAN,
   Employe_ID INT NOT NULL,
   Categorie_ID INT,
   Employe_ID_1 INT NOT NULL,
   PRIMARY KEY(List_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID),
   FOREIGN KEY(Categorie_ID) REFERENCES Categorie(Categorie_ID),
   FOREIGN KEY(Employe_ID_1) REFERENCES Employe(Employe_ID)
);

CREATE TABLE Todo(
   Todo_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Todo_Name VARCHAR(50),
   Todo_Echeance_date VARCHAR(50),
   Todo_End BOOLEAN,
   Todo_Completion_Date DATETIME,
   Todo_Created_date VARCHAR(50),
   Employe_ID INT NOT NULL,
   List_ID INT NOT NULL,
   Employe_ID_1 INT NOT NULL,
   PRIMARY KEY(Todo_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID),
   FOREIGN KEY(List_ID) REFERENCES List(List_ID),
   FOREIGN KEY(Employe_ID_1) REFERENCES Employe(Employe_ID)
);

CREATE TABLE Categorie_Own(
   Employe_ID INT,
   Categorie_ID INT,
   PRIMARY KEY(Employe_ID, Categorie_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID),
   FOREIGN KEY(Categorie_ID) REFERENCES Categorie(Categorie_ID)
);

CREATE TABLE Todo_own(
   Todo_ID INT,
   Employe_ID INT NOT NULL,
   PRIMARY KEY(Todo_ID),
   FOREIGN KEY(Todo_ID) REFERENCES Todo(Todo_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID)
);

CREATE TABLE Liste_Own(
   Employe_ID INT,
   List_ID INT,
   PRIMARY KEY(Employe_ID, List_ID),
   FOREIGN KEY(Employe_ID) REFERENCES Employe(Employe_ID),
   FOREIGN KEY(List_ID) REFERENCES List(List_ID)
);
