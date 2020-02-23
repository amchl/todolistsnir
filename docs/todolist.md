# Let's build a simple todo list !

## Steps

### 1. Display todolist

On va commencer par mettre à jour le rendu de notre _component_ afin de permettre l'affichage de notre _todolist_

On ouvre _app.component.html_:

```html
<h1>{{name}}</h1>

<!-- 
  Add a task from here...
-->

<!-- 
  Display todolist...
-->
```

On ne va pas afficher directement notre liste, on va plutôt **itérer** dessus et afficher chacun de ses éléments.
Nous utilisons le [_framework angular_](https://angular.io/docs), celui-ci nous apporte tous les outils nécessaire pour pouvoir faire ça: Nous allons donc utiliser la directive [ngFor](https://angular.io/api/common/NgForOf).
Elle fonctionne comme une boucle for classique et va nous permettre d'itérer directement sur notre liste, depuis le rendu(fichier HTML).

On commence par déclarer une [div](https://developer.mozilla.org/fr/docs/Web/HTML/Element/div) dans notre HTML :

<details>
  <summary><b>Solution</b></summary>

```html
<!-- 
  Display todolist...
-->
<div>
</div>
```

</details>
<br>

> :information_source: L'élément HTML `<div>` (qui signifie division du document) est un conteneur générique qui permet d'organiser le contenu sans représenter rien de particulier.

Ensuite nous y ajoutons la directive _*ngFor_ :

<details>
  <summary><b>Solution</b></summary>

```html
<!-- 
  Display todolist...
-->
<div *ngFor="">
</div>
```

</details>
<br>

Comme pour une boucle for, nous devons lui donner l'élément sur lequel itérer, déclarer une variable pour chacun de ces éléments et afficher chacune des tâches :

<details>
  <summary><b>Solution</b></summary>

```html
<!-- 
  Display todolist...
-->
<div *ngFor="let todo of todolist">
    {{todo}}
</div>
```

</details>
<br>

> :information_source: l'expression `{{...}}` est une [interpolation](https://angular.io/guide/template-syntax#interpolation-and-template-expressions). Elle nous permet d'afficher une [string](https://www.typescriptlang.org/docs/handbook/basic-types.html#string) (chaine de caractère) formatté depuis notre _component_ dans un élément HTML.

On itère donc sur notre _todolist_ déclaré dans _app.component.ts_.
Rien ne s'affiche :question:

C'est normal ! Comme vous pouvez le voir dans _app.component.ts_, notre liste est instancié vide !

```typescript
todolist = []; // My todolist...
```

Mais si nous rajoutons un élément dans cette liste :

```typescript
todolist = ['task 1']; // My todolist...
```

Vous verrez alors apparaitre _task 1_. Vous pouvez en rajouter autant que vous voulez, mais est-ce vraiment dans le code directement que nous voulons rajouter nos tâches ...? Voyons ça dans la prochaine partie.

### 2. Add task to todolist

Comme on l'a vu, il est très facile de rajouter un élément en _dur_ dans la liste, directement depuis le code. Cependant, nous souhaitons rendre notre liste _dynamique_.
Pour ce faire, nous allons procéder à quelques changements dans le code...

Commençons par créer le rendu qui va nous permettre d'ajouter un élément à la liste. Dans _app.component.html_ :

On crée de nouveau un conteneur générique:

<details>
  <summary><b>Solution</b></summary>

```html
<!-- 
  Add a task from here...
-->
<div>
</div>
```

</details>
<br>

Pour ajouter une tâche, nous allons avoir besoin de deux choses :

* Un champ de saisie de données pour ajouter la tâche
* Un bouton pour rajouter cette tâche à la _todolist_

On commence par le champ de saisie, qui est l'élément [_input_](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input) en html :

<details>
  <summary><b>Solution</b></summary>

```html
<!--
  Add a task from here...
-->
<div>
    <input type="text" placeholder="Task">
</div>
```

</details>
<br>

> :information_source: l'attribut **type** permet de préciser quel type d'input on souhaite afficher. Par exemple, si on met `type="password"`, alors cela affichera des '***' au lieu de la donnée saisie.

> :information_source: l'attribut **placeholder** permet d'afficher une valeur dans le champ tant qu'aucune valeur n'a été saisie. dans le code ci-dessus par exemple, tant que le champ sera _vide_(aucune donnée saisie), il sera affiché '_Task_'.

Un champ de saisie est maintenant affiché sur notre page !

On va ajouter un boutton pour l'ajout de la tâche dans la _todolist_.
il existe aussi un élément html pour ça, il s'agit de [button](https://developer.mozilla.org/fr/docs/Web/HTML/Element/button).
Il va nous permettre un controle interactif sur nos autres éléments html :

<details>
  <summary><b>Solution</b></summary>

```html
<!--
  Add a task from here...
-->
<div>
    <input type="text" placeholder="Task">
    <button type="button">Add</button>
</div>
```

</details>
<br>

Comme vous pouvez le remarquez, Ce qui est marqué entre les balises _button_ sera affiché sur la page en tant que libellé du bouton.

> :information_source: Comme pour les autres éléments HTML, `<button>` possède une liste d'attributs possibles. Ici on utilise `type="button"` car notre bouton n'est pas associé à un [formulaire html](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form).

Maintenant, il va falloir faire passer la donnée saisie dans notre rendu _app.component.html_ à notre _app.component.ts_ afin d'ajouter la tâche dans la _todolist_. Pour cela on va utiliser [Template reference variables](https://angular.io/guide/template-syntax#ref-vars). Il s'agit de déclarer une variable qui va faire référence à l'élément DOM dans notre rendu. Cela va nous permettre d'accéder à la valeur contenu dans l'élément `<input>` !

> :information_source: Le Document Object Model (DOM) est une interface de programmation normalisée par le W3C, qui permet à des scripts d'examiner et de modifier le contenu du navigateur web ([source](https://fr.wikipedia.org/wiki/Document_Object_Model)).

On rajoute donc la référence :

<details>
  <summary><b>Solution</b></summary>

```html
<!--
  Add a task from here...
-->
<div>
    <input #task type="text" placeholder="Task">
    <button type="button">Add</button>
</div>
```

</details>
<br>

Maintenant, nous avons besoin de déclencher un _événement_ pour récupérer la donnée contenu dans `<input>`. Pour récupérer l'événément on va utiliser ce que l'on appelle un [Event binding](https://angular.io/guide/template-syntax#event-binding). On _catch_ un événement directement sur un élément HTML.
L'événement qui nous intéresse est un _'clique'_ sur le bouton pour ajouter une tâche.
Pour ajouter la tâche durant l'événement, nous allons donc appeler la fonction `addTask()` de notre _app.component.ts_ durant l'événement _clique_ sur le bouton :

<details>
  <summary><b>Solution</b></summary>

```html
<!--
  Add a task from here...
-->
<div>
    <input #task type="text" placeholder="Task">
    <button type="button" (click)="addTask()">Add</button>
</div>
```

</details>
<br>


Mais actuellement il n'y a aucun code dans la fonction `addTask()`, alors rien ne se passe ! On va donc rajouter la _valeur de input_ en paramètre de la fonction pour la récupérer :

> :information_source: Si vous voulez vous assurez que votre _binding_ a correctement été fait entre vos deux fichiers, vous pouvez rajouter un `console.log(...)` dans votre fonction pour visualiser ce que vous voulez. Par exemple la valeur d'un paramètre...
Dans votre navigateur ouvrez la console en appuyant sur `F12` et sélectionner l'onglet `console`.

<details>
  <summary><b>Solution</b></summary>

* _app.component.ts_ :

    ```typescript
    addTodo(task: string) {
        console.log('my task : ', task);
        // ...
    }
    ```

* _app.component.html_ :

    ```html
    <!--
    Add a task from here...
    -->
    <div>
        <input #task type="text" placeholder="Task">
        <button type="button" (click)="addTask(task.value)">Add</button>
    </div>
    ```

</details>
<br>

Maintenant que nous passons `task.value` a notre _app.component.ts_, nous pouvons ajouter cette tâche à notre _todolist_ : 

> :information_source: L'object [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) en javascript permet de gérer des tableaux (ici notre _todolist_).

> :information_source: L'opérateur [this](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/L_op%C3%A9rateur_this) sera indispensable ici.

<details>
  <summary><b>Solution</b></summary>

> :information_source: `this` permet d'accéder à la propriété `todolist` de la class `AppComponent` depuis la fonction `addTask()`.

```typescript
todolist = [];

addTodo(task: string) {
    console.log('my task : ', task);
    // Reach todolist property with this operator
    this.todolist.push(task);
    // Visualize todolist
    console.log('my todolist : ', this.todolist);
    // ...
}
```

</details>
<br>

:tada: Voilà ! On arrive maintenant à ajouter dynamiquement des éléments dans notre _todolist_. Reste une dernière étape ! Comme vous avez pu le remarquer, la valeur dans le champ _Task_ ne se réinitialise pas, même après l'ajout de la donnée dans la liste. Il faut mettre à jour sa valeur. Pour cela on va remettre la valeur à vide de `#task`, durant l'événément de _clique_ :

<details>
  <summary><b>Solution</b></summary>

```html
<!--
Add a task from here...
-->
<div>
    <input #task type="text" placeholder="Task">
    <button type="button" (click)="addTask(task.value); task.value=''">Add</button>
</div>
```

> :information_source: Si on voulait manipuler la valeur de `input` depuis notre fichier `app.component.ts`, nous aurions pu utiliser la directive [NgModel](https://angular.io/api/forms/NgModel) pour permettre un _binding_ dans les deux sens ([two way data bindings](https://angular.io/guide/template-syntax#binding-syntax)).

</details>
<br>

Maintenant que nous sommes capable de rajouter des tâches dans notre _todolist_, peut-être que nous aurons aussi besoin d'en supprimer...

### 3. Remove task from todolist

Vous avez pu remarquer, si vous avez jeté un oeil à la documentation concernant les `Array`, qu'il n'existe pas de fonction, rattaché aux listes en javascript, qui permet de supprimer directement un élément de celle-ci. Il existe plusieurs manières de supprimer un élément d'une liste, nous allons devoir faire preuve d'innovation !
L'une des solutions dans notre cas est de <u>filtrer</u> la liste existante en gardant que les éléments différents d'un élément donner en paramètre :

<details>
  <summary><b>Solution</b></summary>

> :information_source: On utilise la fonction `filter` pour chercher la task que l'on souhaite retirer de la liste.

```typescript
//...

removeTask(task: string) {
    // On réassigne todolist
    // On filtre sur l'objet de la liste
    // différent de task donné en paramètre
    this.todolist = this.todolist.filter(obj => obj !== task);
    // On peut regarder et vérifier que l'élement ne soit plus présent
    console.log(todolist);
}
```

</details>
<br>

Maintenant on va modifier notre rendu pour pouvoir effectuer cette action.
Pour <u>chacune</u> des tâches dans notre _todolist_, on souhaite y associer un bouton qui nous permet de déclencher un événement dans lequel on va appeler la fonction précedemment écrite pour supprimer une tâche :

<details>
  <summary><b>Solution</b></summary>

```html
<!-- 
  Display todolist...
-->
<div *ngFor="let todo of todolist">
    <div>
        {{todo}}
        <button (click)="removeTask(todo)">Remove</button>
    </div>
</div>
```

</details>
<br>

### 4. Add task object and update previous code

### 5. Set task to done on click

## Bonus

### 1. Improve design

Essayez d'améliorer de le style de votre todolist avec [bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/) ou directement en ajoutant le style sur les éléments html et/ou fichier scss !

### 2. Add title to task

Ajouter un titre à chaque tâche :

1. Mettre à jour la classe `Task` pour lui ajouter une proprieté `title`.
2. Mettre à jour le component pour ajouter `title` en paramètre.
3. Mettre à jour la vue pour afficher `title`.
